import { Divider } from "@mui/material";
import { Button, Checkbox, Input, Modal, Popconfirm, Table } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { completeTodos, deleteTodos, editTodos, getTodos, postTodos } from "../../reducers/Todos";



const Todos = () => {
  const [showModal,setShowModal] = useState(false)
  const [showEModal,setShowEModal] = useState(false)
  const [value,setValue] = useState('')
  const [idx,setIdx] = useState(null)
  const dispatch = useDispatch();
  const todos = useSelector(state=>state.todos.todo)
  const columns = [
    {
      title: 'complete',
      dataIndex: 'complete',
      key: 'complete',
      render:(e,row)=>{
        return (
          <Checkbox checked={row.complete} onChange={()=>dispatch(completeTodos(row.id))}></Checkbox>
        )
      }
    },
    {
      title: 'title',
      dataIndex: 'title',
      key: 'title',
      render:(e,row)=>{
        return (
          <h1 style={row.complete?{textDecoration:"line-through"}:{textDecoration:''}} className='text-3xl font-medium'>{row.title}</h1>
        )
      }
    },
    {
      title: 'action',
      dataIndex: 'action',
      key: 'action',
      render:(e,row)=>{
        return (
          <div className="flex items-center gap-3">
            <Button onClick={()=>{
              editValue(row.id)
              setShowEModal(!showEModal)
            }}>edit</Button>
            <Popconfirm
              title="Delete the todo"
              description="Are you sure to delete this todo?"
              onConfirm={() => {
                dispatch(deleteTodos(row.id));
              }}
              onCancel={() => console.log(55)}
              okText="Delete"
              okType='default'
              cancelText="No"
            >
              <Button>Delete</Button>
            </Popconfirm>
          </div>
        )
      }
    },
  ];

  const editValue=(id)=>{
      const inTodo = todos.find(todo=>todo.id===id)
      setValue(inTodo.title)
      setIdx(id)
  }
  useEffect(() => {
    dispatch(getTodos())
  }, []);
  return (
    <div className="">
      <div className="container mx-auto">
        <div>
          <h1 className="text-4xl font-bold text-center">TODO</h1>
          <Divider/>
          <Button className="my-2 bg-blue-600" type="primary" onClick={()=>setShowModal(!showModal)}>add</Button>
          <Table className="w-full" dataSource={todos} columns={columns} />
        </div>
      </div>
      <Modal title="Add todo" footer={false} open={showModal} onCancel={()=>setShowModal(!showModal)}>
        <Input value={value} onChange={(e)=>setValue(e.target.value)} />
        <Button className="my-2 bg-blue-600" type="primary" onClick={()=>{dispatch(postTodos(value))
        setShowModal(!showModal)
        setValue('')}}>add</Button>
      </Modal>
      <Modal title="Edit todo" footer={false} open={showEModal} onCancel={()=>setShowEModal(!showEModal)}>
        <Input value={value} onChange={(e)=>setValue(e.target.value)} />
        <Button className="my-2 bg-blue-600" type="primary" onClick={()=>{dispatch(editTodos({title:value,id:idx}))
        setShowEModal(!showEModal)
        setValue('')
        setIdx(null)}}>edit</Button>
      </Modal>
    </div>
  );
};

export default Todos;
