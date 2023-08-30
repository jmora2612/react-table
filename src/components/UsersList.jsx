export const UsersList = ( {users, deletes},  ) => {

    const {name, picture, location, email} =users
  return (
    <>
      <tbody>
          <tr>
            <td><img src={picture.medium} alt="picture.medium" /></td>
            <td>{name.first}</td>
            <td>{name.last}</td>
            <td>{location.country}</td>
            <td><button onClick={() => {deletes(email)}}>Delete</button></td>
          </tr>
        </tbody>
    </>
  );
};
