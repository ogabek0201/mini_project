import {
  Button,
  Checkbox,
  Col,
  DatePicker,
  Divider,
  Form,
  Image,
  Input,
  message,
  Modal,
  Popconfirm,
  Row,
  Table,
} from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addUsers,
  deleteUsers,
  editUsers,
  getUsers,
} from "../../reducers/Users";
import { fileToBase64 } from "../../utils/fileToBase64";
import moment from "moment";

const Users = () => {
  const [showModal, setShowModal] = useState(false);
  
  const [EModal, setEModal] = useState(false);
  const [idx, setIdx] = useState({});
  const [file, setFile] = useState("");
  const [checked, setCheked] = useState(false);
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const todos = useSelector((state) => state.users.user);
  const columns = [
    {
      title: "Id",
      dataIndex: "id",
      key: "id",
      render: (e, row) => {
        return <p className="text-xl font-medium">{row.id}</p>;
      },
    },
    {
      title: "Avatar",
      dataIndex: "id",
      key: "id",
      render: (e, row) => {
        return (
          <Image src={row.avatar} className="rounded-full w-6" width={60} />
        );
      },
    },
    {
      title: "Name",
      dataIndex: "User",
      key: "User",
      render: (e, row) => {
        return (
          <h1
            style={
              row.complete
                ? { textDecoration: "line-through" }
                : { textDecoration: "" }
            }
            className="text-2xl font-medium"
          >
            {row.user}
          </h1>
        );
      },
    },
    {
      title: "LastName",
      dataIndex: "User",
      key: "User",
      render: (e, row) => {
        return (
          <h1
            style={
              row.complete
                ? { textDecoration: "line-through" }
                : { textDecoration: "" }
            }
            className="text-2xl font-medium"
          >
            {row.lastName}
          </h1>
        );
      },
    },
    {
      title: "Birthday",
      dataIndex: "User",
      key: "User",
      render: (e, row) => {
        return (
          <h1
            style={
              row.complete
                ? { textDecoration: "line-through" }
                : { textDecoration: "" }
            }
            className="text-2xl font-medium"
          >
            {row.birthday}
          </h1>
        );
      },
    },
    {
      title: "Married",
      dataIndex: "User",
      key: "User",
      render: (e, row) => {
        return (
          <h1 className="text-2xl font-medium">
            {row.isMaried ? "married" : "single"}
          </h1>
        );
      },
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      render: (e, row) => {
        return <p className="text-xl">{row.email}</p>;
      },
    },
    {
      title: "action",
      dataIndex: "action",
      key: "action",
      render: (e, row) => {
        return (
          <div className="flex items-center gap-3">
            <Button
              onClick={() => {
                setEModal(!EModal);
                setIdx(row);
                setCheked(row.isMaried)
                setFile(row.avatar)
              }}
            >
              edit
            </Button>

            <Popconfirm
              title="Delete the user"
              description="Are you sure to delete this user?"
              onConfirm={() => {
                dispatch(deleteUsers(row.id));
              }}
              onCancel={() => console.log(55)}
              okText="Delete"
              okType="default"
              cancelText="No"
            >
              <Button>Delete</Button>
            </Popconfirm>
          </div>
        );
      },
    },
  ];

  const onFinish = (e) => {
    e.avatar = file;
    e.isMaried = checked;
    e.birthday = e.birthday.format("YYYY-MM-DD");
    let obj = { ...e };
    console.log(obj);
    dispatch(addUsers(obj));
    setCheked(false);
    setFile("");
    setShowModal(false);
    form.resetFields()
    message.success("user added successfully");
  };

  const onFinishE = (e) => {
    e.avatar = file;
    e.isMaried = checked;
    e.birthday = e.birthday.format("YYYY-MM-DD");
    let obj = { ...e };
    console.log(obj);
    dispatch(editUsers({ obj: obj, id: idx.id }));
    setEModal(false);
    setCheked(false);
    setFile("");
    setIdx({});
    form.resetFields()
    message.success("user edit successfully");
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
    message.error("Error");
  };
  useEffect(() => {
    dispatch(getUsers());
  }, []);
  return (
    <div className="">
      <div className="container mx-auto">
        <div>
          <h1 className="text-4xl font-bold text-center">Users</h1>
          <Divider />
          <Button
            className="my-2 bg-blue-600"
            type="primary"
            onClick={() => {
              setShowModal(!showModal)}}
          >
            add
          </Button>
          <Table className="w-full" dataSource={todos} columns={columns} />
        </div>
      </div>
      <Modal
        title="Add users"
        footer={false}
        open={showModal}
        onCancel={() => setShowModal(!showModal)}
      >
        <Form
          className="text-left "
          name="basic"
          labelCol={{
            span: 8,
          }}
          form={form}
          wrapperCol={{
            span: 16,
          }}
          style={{
            maxWidth: 600,
          }}
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Row gutter={[10, 0]}>
            <Col span={20}>
              <Form.Item
                label="Ava"
                name="avatar"
                rules={[
                  {
                    required: true,
                    message: "Please put Avatar!",
                  },
                ]}
              >
                <input
                  type="file"
                  onChange={async (e) => {
                    setFile(await fileToBase64(e.target.files[0]));
                  }}
                  name="img"
                />
              </Form.Item>
            </Col>
            <Col span={20}>
              <Form.Item
                label="Name"
                name="user"
                rules={[
                  {
                    required: true,
                    message: "Please input Name!",
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={20}>
              <Form.Item
                label="Last Name"
                name="lastName"
                rules={[
                  {
                    required: true,
                    message: "Please input Last Name!",
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={20}>
              <Form.Item
                label="Email"
                name="email"
                rules={[
                  {
                    type: "email",
                    required: true,
                    message: "Please input your password!",
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={20}>
              <Form.Item
                label="Password"
                name="password"
                rules={[
                  {
                    required: true,
                    message: "Please input your password!",
                  },
                ]}
              >
                <Input.Password />
              </Form.Item>
            </Col>
            <Col span={20}>
              <Form.Item
                label="Birthday"
                name="birthday"
                rules={[
                  {
                    required: true,
                    message: "Please input birthday!",
                  },
                ]}
              >
                <DatePicker />
              </Form.Item>
            </Col>
            <Col span={20}>
              <Form.Item
                label="Maried"
                name="isMaried"
                rules={[
                  {
                    required: false,
                    message: "Please input birthday!",
                  },
                ]}
              >
                <Checkbox
                  checked={checked}
                  onChange={(e) => setCheked(e.target.checked)}
                ></Checkbox>
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                wrapperCol={{
                  offset: 8,
                  span: 16,
                }}
              >
                <Button style={{ background: "" }} htmlType="submit">
                  Add
                </Button>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
      <Modal
        title="edit users"
        footer={false}
        open={EModal}
        onCancel={() => setEModal(!EModal)}
      >
        <Form
          className="text-left "
          name="basic"
          labelCol={{
            span: 8,
          }}
          form={form}
          wrapperCol={{
            span: 16,
          }}
          style={{
            maxWidth: 600,
          }}
          initialValues={{
           
            remember: true,
            user:idx.user,
            lastName:idx.lastName,
            email:idx.email,
            password:idx.password,
            birthday:moment(`${new Date(idx.birthday)}`),
            // setCheked(idx.isMaried)
            // isMaried:setCheked(idx.isMaried),


          }}
          onFinish={onFinishE}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Row gutter={[10, 0]}>
            <Col span={20}>
              <Form.Item
                label="Ava"
                name="avatar"
                rules={[
                  {
                    required: false,
                    message: "Please put Avatar!",
                  },
                ]}
              >
                <input
                  type="file"
                  onChange={async (e) => {
                    setFile(await fileToBase64(e.target.files[0]));
                  }}
                  name="img"
                />
              </Form.Item>
            </Col>
            <Col span={20}>
              <Form.Item
                label="Name"
                name="user"
                rules={[
                  {
                    required: true,
                    message: "Please input Name!",
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={20}>
              <Form.Item
                label="Last Name"
                name="lastName"
                rules={[
                  {
                    required: true,
                    message: "Please input Last Name!",
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={20}>
              <Form.Item
                label="Email"
                name="email"
                rules={[
                  {
                    type: "email",
                    required: true,
                    message: "Please input your password!",
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={20}>
              <Form.Item
                label="Password"
                name="password"
                rules={[
                  {
                    required: true,
                    message: "Please input your password!",
                  },
                ]}
              >
                <Input.Password />
              </Form.Item>
            </Col>
            <Col span={20}>
              <Form.Item
                label="Birthday"
                name="birthday"
                rules={[
                  {
                    required: true,
                    message: "Please input birthday!",
                  },
                ]}
              >
                <DatePicker />
              </Form.Item>
            </Col>
            <Col span={20}>
              <Form.Item
                label="Maried"
                name="isMaried"
                rules={[
                  {
                    required: false,
                    message: "Please input birthday!",
                  },
                ]}
              >
                <Checkbox
                  checked={checked}
                  onChange={(e) => setCheked(e.target.checked)}
                ></Checkbox>
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                wrapperCol={{
                  offset: 8,
                  span: 16,
                }}
              >
                <Button style={{ background: "" }} htmlType="submit">
                  Edit
                </Button>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
    </div>
  );
};

export default Users;
