"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint, send_file
from Backend.models import db, User, Ingreso, Gasto, Budget
from Backend.utils import generate_sitemap, APIException
from flask_cors import CORS
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Table, Image, TableStyle
from reportlab.lib.styles import getSampleStyleSheet
from reportlab.lib.pagesizes import letter
from reportlab.lib import colors
from io import BytesIO
import os

api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200

#########################
# API DOCUMENTATION     #
#########################

# ===================#
#  Rutas de Usuario #
# ===================#

# SIGNUP > Registro


@api.route("/signup", methods=["POST"])
def signup():
    data = request.get_json() or {}
    name = data.get("name", "").strip()
    email = data.get("email", "").strip().lower()
    password = data.get("password", "").strip()

    # Validacion de todos los campos #
    if not name or not email or not password:
        return jsonify({"Mensaje": "Todos los campos son obligatorios!"}), 400
    # Validacion de longitud de password #
    if len(password) < 12:
        return jsonify({"Mensaje": "La contraseña debe tener minimo 12 caracteres."}), 400
    # Verificacion de que no exista el mail #
    if User.query.filter_by(email=email).first():
        return jsonify({"Mensaje": "El email ya fue registrado"}), 400

    # Creacion de usuario #
    NewUser = User(name=name, email=email)
    NewUser.set_password(password)
    db.session.add(NewUser)
    db.session.commit()
    return jsonify({"Mensaje": "El usuario se ha creado correctamente, por favor proceda a iniciar sesion.", "user": NewUser.serialize()}), 201

# Login > Acceso


@api.route("/login", methods=["POST"])
def login():
    data = request.get_json() or {}
    email = data.get("email", "").strip().lower()
    password = data.get("password", "").strip()

    # Validacion de todos los campos #
    if not email or not password:
        return jsonify({"Mensaje": "Se requiere email y contraseña"}), 400
    # Verificacion de que no exista el mail #
    user = User.query.filter_by(email=email).first()
    if not user or not user.check_password(password):
        return jsonify({"Mensaje": "Credenciales invalidas"}), 401

    access_token = create_access_token(identity=str(user.id))
    return jsonify({
        "Mensaje": "Login Exitoso",
        "token": access_token,
        "user": user.serialize()
    }), 200


# Verify > Valida el token

@api.route("/verify", methods=["GET"])
# Obliga a enviar el token en el header.-
@jwt_required()
def verify():
    # Obtenemos el 'identity' y lo guardamos en la variable 'user_id'.-
    user_id = get_jwt_identity()
    user = User.query.get(user_id)

    if not user:
        return jsonify({
            "message": "Usuario no encontrado"
        }), 404

    return jsonify({
        "message": "Token válido",
        "user": user.serialize()
    }), 200

# =======================#
#  Rutas de Presupuesto #
# =======================#

# Crear Presupuesto


@api.route("/budgets", methods=["POST"])
@jwt_required()
def create_budget():
    user_id = get_jwt_identity()
    data = request.get_json() or {}
    name = (data.get("name") or "").strip()
    # Validar que el presupuesto tenga nombre
    if not name:
        return jsonify({"msg": "El nombre del presupuesto es obligatorio"}), 400

    # Validar que no existan duplicados
    existing = Budget.query.filter_by(name=name, user_id=int(user_id)).first()
    if existing:
        return jsonify({"msg": "Ya existe un presupuesto con ese nombre"}), 400

    # Crear un nuevo presupuesto
    new_budget = Budget(
        name=name,
        user_id=int(user_id)
    )

    db.session.add(new_budget)
    db.session.commit()

    return jsonify(new_budget.serialize()), 201


# Llamar Presupuesto por ID
@api.route("/budgets/<int:budget_id>", methods=["GET"])
@jwt_required()
def get_budget(budget_id):
    user_id = get_jwt_identity()

    budget = Budget.query.filter_by(id=budget_id, user_id=user_id).first()
    if not budget:
        return jsonify({"msg": "Presupuesto no encontrado"}), 404

    return jsonify(budget.serialize()), 200

# Obtener todos los presupuestos por user


@api.route("/budgets/user/<int:user_id>", methods=["GET"])
@jwt_required()
def get_user_budgets(user_id):
    current_user_id = get_jwt_identity()
    if int(current_user_id) != user_id:
        return jsonify({"msg": "No autorizado para ver estos presupuestos"}), 403

    budgets = Budget.query.filter_by(user_id=user_id).all()
    # Asegúrate de que Budget.serialize() incluya los totales para el balance
    return jsonify([budget.serialize() for budget in budgets]), 200

# Eliminar Presupuesto por user


@api.route("/budgets/<int:budget_id>", methods=["DELETE"])
@jwt_required()
def delete_budget(budget_id):
    user_id = get_jwt_identity()
    budget = Budget.query.filter_by(id=budget_id, user_id=user_id).first()

    if not budget:
        return jsonify({"msg": "Presupuesto no encontrado"}), 404

    db.session.delete(budget)
    db.session.commit()

    return jsonify({"msg": "Presupuesto eliminado correctamente"}), 200


# ====================#
#  Rutas de Ingresos #
# ====================#

# Agregar Ingreso
@api.route("/budgets/<int:budget_id>/ingreso", methods=["POST"])
@jwt_required()
def add_ingreso(budget_id):
    user_id = get_jwt_identity()
    budget = Budget.query.filter_by(id=budget_id, user_id=user_id).first()

    if not budget:
        return jsonify({"msg": "Presupuesto no encontrado"}), 404

    data = request.get_json() or {}
    description = (data.get("description") or "Ingreso").strip()
    category = (data.get("category") or "Otros").strip()
    amount = data.get("amount")

    try:
        amount = float(amount)
    except:
        return jsonify({"msg": "Monto inválido"}), 400

    if amount < 0:
        return jsonify({"msg": "Monto NEGATIVO"}), 400

    ingreso = Ingreso(
        description=description,
        category=category,
        amount=amount,
        budget_id=budget_id
    )

    db.session.add(ingreso)
    db.session.commit()

    return jsonify(ingreso.serialize()), 201

# Editar Ingreso


@api.route("/ingresos/<int:ingreso_id>", methods=["PUT"])
@jwt_required()
def update_ingreso(ingreso_id):
    current_user_id = get_jwt_identity()

    ingreso = Ingreso.query.get(ingreso_id)
    if not ingreso:
        return jsonify({"msg": "Ingreso no encontrado"}), 404

    budget = Budget.query.get(ingreso.budget_id)
    if int(budget.user_id) != int(current_user_id):
        return jsonify({"msg": "No autorizado"}), 403

    data = request.get_json() or {}

    if "amount" in data:
        try:
            amount = float(data["amount"])
            if amount < 0:
                return jsonify({"msg": "Monto inválido"}), 400
            ingreso.amount = amount
        except:
            return jsonify({"msg": "Monto inválido"}), 400

    ingreso.description = data.get("description", ingreso.description)
    ingreso.category = data.get("category", ingreso.category)

    db.session.commit()
    return jsonify({
        "msg": "Ingreso actualizado",
        "ingreso": ingreso.serialize()
    }), 200


@api.route("/ingresos/<int:ingreso_id>", methods=["DELETE"])
@jwt_required()
def delete_ingreso(ingreso_id):
    user_id = get_jwt_identity()

    ingreso = Ingreso.query.get(ingreso_id)
    if not ingreso:
        return jsonify({"msg": "Ingreso no encontrado"}), 404

    budget = Budget.query.get(ingreso.budget_id)
    if budget.user_id != int(user_id):
        return jsonify({"msg": "No autorizado"}), 403

    db.session.delete(ingreso)
    db.session.commit()

    return jsonify({"msg": "Ingreso eliminado"}), 200


# ===================#
#  Rutas de Gastos  #
# ===================#


@api.route("/budgets/<int:budget_id>/gasto", methods=["POST"])
@jwt_required()
def add_gasto(budget_id):
    user_id = get_jwt_identity()
    budget = Budget.query.filter_by(id=budget_id, user_id=user_id).first()

    if not budget:
        return jsonify({"msg": "Presupuesto no encontrado"}), 404

    data = request.get_json() or {}
    description = (data.get("description") or "Gasto").strip()
    category = (data.get("category") or "General").strip()
    amount = data.get("amount")

    try:
        amount = float(amount)
    except:
        return jsonify({"msg": "Monto inválido"}), 400

    if amount < 0:
        return jsonify({"msg": "Monto inválido"}), 400

    gasto = Gasto(
        description=description,
        category=category,
        amount=amount,
        budget_id=budget_id
    )

    db.session.add(gasto)
    db.session.commit()

    return jsonify(gasto.serialize()), 201


# Editar Gasto

@api.route("/gastos/<int:gasto_id>", methods=["PUT"])
@jwt_required()
def update_gasto(gasto_id):
    current_user_id = get_jwt_identity()

    gasto = Gasto.query.get(gasto_id)
    if not gasto:
        return jsonify({"msg": "Gasto no encontrado"}), 404

    budget = Budget.query.get(gasto.budget_id)
    if int(budget.user_id) != int(current_user_id):
        return jsonify({"msg": "No autorizado"}), 403

    data = request.get_json() or {}

    if "amount" in data:
        try:
            amount = float(data["amount"])
            if amount < 0:
                return jsonify({"msg": "Monto inválido"}), 400
            gasto.amount = amount
        except:
            return jsonify({"msg": "Monto inválido"}), 400

    gasto.description = data.get("description", gasto.description)
    gasto.category = data.get("category", gasto.category)

    db.session.commit()

    return jsonify({
        "msg": "Gasto actualizado",
        "gasto": gasto.serialize()
    }), 200

# Eliminar gasto


@api.route("/gastos/<int:gasto_id>", methods=["DELETE"])
@jwt_required()
def delete_gasto(gasto_id):
    user_id = get_jwt_identity()

    gasto = Gasto.query.get(gasto_id)
    if not gasto:
        return jsonify({"msg": "Gasto no encontrado"}), 404

    budget = Budget.query.get(gasto.budget_id)
    if budget.user_id != int(user_id):
        return jsonify({"msg": "No autorizado"}), 403

    db.session.delete(gasto)
    db.session.commit()

    return jsonify({"msg": "Gasto eliminado"}), 200


# Crear archivo PDF

@api.route("/budgets/<int:budget_id>/pdf", methods=["GET"])
@jwt_required()
def generate_budget_pdf(budget_id):
    user_id = get_jwt_identity()

    # Verificar que exista y que pertenezca al usuario
    budget = Budget.query.filter_by(id=budget_id, user_id=user_id).first()
    if not budget:
        return jsonify({"msg": "Presupuesto no encontrado"}), 404

    # Crear archivo PDF en memoria
    buffer = BytesIO()
    doc = SimpleDocTemplate(buffer, pagesize=letter)

    styles = getSampleStyleSheet()
    story = []

    # --- LOGO Y TÍTULO ---

    LOGO_PATH = os.path.join(os.path.dirname(
        __file__), "static", "img", "Logo.jpeg")

    try:
        logo = Image(LOGO_PATH, width=50, height=50)
    except:
        logo = None

    title = Paragraph(
        f"<b>Billetera Familiar</b><br/>Reporte del Presupuesto: {budget.name}", styles["Title"])

    if logo:
        header = Table([[logo, title]], colWidths=[60, 400])
    else:
        header = Table([[title]])

    header.setStyle(TableStyle([
        ("VALIGN", (0, 0), (-1, -1), "MIDDLE"),
        ("LEFTPADDING", (0, 0), (-1, -1), 0),
        ("RIGHTPADDING", (0, 0), (-1, -1), 0),
    ]))

    story.append(header)
    story.append(Spacer(1, 20))

    # Obtener ingresos y gastos
    ingresos = Ingreso.query.filter_by(budget_id=budget_id).all()
    gastos = Gasto.query.filter_by(budget_id=budget_id).all()

    total_ingresos = sum(i.amount for i in ingresos)
    total_gastos = sum(g.amount for g in gastos)
    balance = total_ingresos - total_gastos

    # Resumen general
    story.append(
        Paragraph(f"Total de Ingresos: ₡{total_ingresos:.2f}", styles["Normal"]))
    story.append(
        Paragraph(f"Total de Gastos: ₡{total_gastos:.2f}", styles["Normal"]))
    story.append(Paragraph(f"Balance Final: ₡{balance:.2f}", styles["Normal"]))
    story.append(Spacer(1, 20))

    # Tabla combinada
    rows = [["Tipo", "Descripción", "Categoría", "Monto"]]

    for i in ingresos:
        rows.append(["Ingreso", i.description, i.category, f"₡{i.amount:.2f}"])

    for g in gastos:
        rows.append(["Gasto", g.description, g.category, f"₡{g.amount:.2f}"])

    if len(rows) > 1:
        table = Table(rows, colWidths=[70, 200, 120, 80])
        table.setStyle(TableStyle([
            ("BACKGROUND", (0, 0), (-1, 0), colors.lightgrey),
            ("GRID", (0, 0), (-1, -1), 0.5, colors.grey),
            ("VALIGN", (0, 0), (-1, -1), "MIDDLE"),
        ]))
        story.append(table)

    story.append(Spacer(1, 30))

    # --- FOOTER ---
    lema = Paragraph(
        "<i>Tu familia... Tus metas... Tu billetera familiar!</i>",
        styles["Normal"]
    )
    story.append(lema)

    # Crear PDF
    doc.build(story)
    buffer.seek(0)

    return send_file(
        buffer,
        as_attachment=True,
        download_name=f"presupuesto_{budget.name}.pdf",
        mimetype="application/pdf"
    )
