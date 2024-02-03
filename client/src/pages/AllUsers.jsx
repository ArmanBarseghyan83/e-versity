import { useMutation, useQuery } from '@apollo/client';
import { Table, Button, Spin } from 'antd';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
  DeleteFilled,
  CheckOutlined,
  CloseOutlined,
  EditFilled,
} from '@ant-design/icons';
import { EDIT_ADMIN, EDIT_INSTRUCTOR, DELETE_USER } from '../utils/mutations';
import { ALL_USERS } from '../utils/queries';

const { Column } = Table;

const AllUsers = () => {
  const { data, refetch, loading } = useQuery(ALL_USERS);
  const [editAdmin] = useMutation(EDIT_ADMIN);
  const [editInstructor] = useMutation(EDIT_INSTRUCTOR);
  const [deleteUser] = useMutation(DELETE_USER);

  const { userId } = useSelector((state) => state.auth);

  const tableData = data?.users.map((user) => ({
    key: user._id,
    username: user.username,
    isAdmin: user.isAdmin,
    isInstructor: user.isInstructor,
  }));

  const deleteUserHandler = async (id) => {
    await deleteUser({
      variables: { id },
    });
  };

  const editInstructorHandler = async (id) => {
    await editInstructor({
      variables: { id },
    });
  };

  const editAdminHandler = async (id) => {
    await editAdmin({
      variables: { id },
    });
  };

  refetch();

  if (loading) {
    return (
      <>
        {loading && (
          <Spin tip="Loading" size="large">
            <div className="content" />
          </Spin>
        )}
      </>
    );
  }

  return (
    <>
      <h2>All Users</h2>
      <Table dataSource={tableData}>
        <Column title="Username" dataIndex="username" key="username" />

        <Column
          title={
            <span>
              Admin <EditFilled />
            </span>
          }
          key="admin"
          render={(record) => (
            <>
              {record.key === userId ? (
                <Button disabled>
                  {record?.isAdmin ? <CloseOutlined /> : <CheckOutlined />}
                </Button>
              ) : (
                <Button onClick={() => editAdminHandler(record.key)}>
                  {record?.isAdmin ? <CloseOutlined /> : <CheckOutlined />}
                </Button>
              )}
            </>
          )}
        />

        <Column
          title={
            <span>
              {' '}
              Instructor <EditFilled />
            </span>
          }
          key="1nstructor"
          render={(record) => (
            <>
              {record.key === userId ? (
                <Button disabled>
                  {record?.isInstructor ? <CloseOutlined /> : <CheckOutlined />}
                </Button>
              ) : (
                <Button onClick={() => editInstructorHandler(record.key)}>
                  {record?.isInstructor ? <CloseOutlined /> : <CheckOutlined />}
                </Button>
              )}
            </>
          )}
        />

        <Column
          key="delete"
          render={(record) => (
            <>
              {record.key === userId ? (
                <Link role="button" disabled>
                  <DeleteFilled />
                </Link>
              ) : (
                <Link
                  role="button"
                  onClick={() => deleteUserHandler(record.key)}
                >
                  <DeleteFilled />
                </Link>
              )}
            </>
          )}
        />
      </Table>
    </>
  );
};

export default AllUsers;
