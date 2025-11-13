"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from Backend.models import db, User
from Backend.utils import generate_sitemap, APIException
from flask_cors import CORS
from flask_jwt_extended import create_access_token

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
# User creation         #
# Method: POST          #
# email, password, name #
#########################

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
    return jsonify({"Mensaje": "El usuario se ha creado correctamente", "user": NewUser.serialize()}), 201

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
