const getUserName = () => {
  const filterUsernameArr = process.argv
    .slice(2)
    .filter((arg) => arg.startsWith("--username="));
  return filterUsernameArr.length > 0
    ? filterUsernameArr[0].replace("--username=", "")
    : "Unknown User";
};

export default getUserName;
