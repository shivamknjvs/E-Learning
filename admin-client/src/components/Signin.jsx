import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import {
  Card,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../config.js";
import { useRecoilState, useSetRecoilState } from "recoil";
import { userState } from "../store/atoms/user.js";
import { isUserState } from "../store/atoms/isUser.js";

function Signin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const setUser = useSetRecoilState(userState);
  const [isUser, setIsUser] = useRecoilState(isUserState);
  console.log("signin", isUser.isUser);
  return (
    <div>
      <div
        style={{
          paddingTop: 150,
          marginBottom: 10,
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Typography variant={"h6"}>
          Welcome to Coursera. Sign up below
        </Typography>
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Card varint={"outlined"} style={{ width: 400, padding: 20 }}>
          <TextField
            onChange={(evant11) => {
              let elemt = evant11.target;
              setEmail(elemt.value);
            }}
            fullWidth={true}
            label="Email"
            variant="outlined"
          />
          <br />
          <br />
          <TextField
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            fullWidth={true}
            label="Password"
            variant="outlined"
            type={"password"}
          />
          <br />
          <br />
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Role</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={isUser.isUser ? "User" : "Admin"}
              label="Role"
              onChange={(e) => {
                console.log(e.target.value);
                const selectedRole = e.target.value;
                setIsUser({ isUser: selectedRole === "User" });
              }}
            >
              <MenuItem value={"Admin"}>Admin</MenuItem>
              <MenuItem value={"User"}>User</MenuItem>
            </Select>
          </FormControl>
          <br />
          <br />
          <Button
            size={"large"}
            variant="contained"
            onClick={async () => {
              const role = isUser.isUser ? "user" : "admin";
              console.log(role);
              const res = await axios.post(
                `${BASE_URL}/${role}/login`,
                {
                  username: email,
                  password: password,
                },
                {
                  headers: {
                    "Content-type": "application/json",
                  },
                }
              );
              const data = res.data;

              localStorage.setItem("token", data.token);
              localStorage.setItem("isUser", isUser.isUser);
              // window.location = "/"
              setUser({
                userEmail: email,
                isLoading: false,
              });
              navigate("/courses");
            }}
          >
            {" "}
            Signin
          </Button>
        </Card>
      </div>
    </div>
  );
}

export default Signin;
