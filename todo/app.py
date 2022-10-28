from flask import Flask, render_template, request, jsonify
app = Flask(__name__)

from pymongo import MongoClient
import certifi
ca = certifi.where()

client = MongoClient('mongodb+srv://test:sparta@Cluster0.jm3sqm5.mongodb.net/?retryWrites=true&w=majority', tlsCAFile=ca)
db = client.dbsparta

@app.route('/')
def home():
    return render_template('index.html')

@app.route("/todo", methods=["POST"])
def todo_post():
    print(request.is_json)
    params = request.get_json()
    todo_receive = params['todo_give']
    todo_list = list(db.todo.find({}, {'_id': False}))
    count = len(todo_list)
    doc = {
        'num': count,
        'todo': todo_receive,
        'done': 0
    }

    db.todo.insert_one(doc)
    return jsonify({'msg': '등록 완료!'})

@app.route("/todo/done", methods=["PUT"])
def todo_done():
    params = request.get_json()
    num_receive = params['num_give']
    db.todo.update_one({'num': int(num_receive)}, {'$set': {'done': 1}})

    return jsonify({'msg': '투두 완료!'})

@app.route("/todo", methods=["GET"])
def todo_get():
    todo_list = list(db.todo.find({}, {'_id': False}))
    return jsonify({'todos': todo_list})

@app.route("/todo/delete", methods=["DELETE"])
def todo_delete():
    params = request.get_json()
    num_receive = params['num_give']
    db.todo.delete_one({'num': int(num_receive)})

    return jsonify({'msg': '삭제 완료!'})

@app.route("/todo/update", methods=["PUT"])
def todo_update():
    params = request.get_json()
    num_receive = params['num_give']
    todo_receive = params['todo_give']
    db.todo.update_one({'num': int(num_receive)}, {'$set': {'todo': todo_receive}})

    return jsonify({'msg': '수정 완료!'})

if __name__ == '__main__':
    app.run('0.0.0.0', port=5000, debug=True)