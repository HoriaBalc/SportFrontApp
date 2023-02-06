import {
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from "@material-ui/core";
import { useStyles } from "./index.js";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { AiOutlineArrowDown, AiOutlineArrowUp } from "react-icons/ai";
const TableUser = (props) => {
  const classes = useStyles();

  const [rows, setRows] = useState([]);
  const [deleted, setDeleted] = useState(0);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const sortNameAsc = () => {
    axios({
      method: "GET",
      url: "https://localhost:7112/api/v1/User/order/name/ascent",
    }).then((res) => {
      console.log(res);
      setRows(res.data);
    });
  };

  const sortNameDesc = () => {
    axios({
      method: "GET",
      url: "https://localhost:7112/api/v1/User/order/name/descent",
    }).then((res) => {
      console.log(res);
      setRows(res.data);
    });
  };

  const sortEmailAsc = () => {
    axios({
      method: "GET",
      url: "https://localhost:7112/api/v1/User/order/email/ascent",
    }).then((res) => {
      console.log(res);
      setRows(res.data);
    });
  };

  const sortEmailDesc = () => {
    axios({
      method: "GET",
      url: "https://localhost:7112/api/v1/User/order/email/descent",
    }).then((res) => {
      console.log(res);
      setRows(res.data);
    });
  };

  function handleDelete(email) {
    axios({
      method: "DELETE",
      url: `https://localhost:7112/api/v1/User/${email}`,
    })
      .then((res) => {
        console.log(res);
        setDeleted(deleted + 1);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  useEffect(() => {
    //let email = localStorage.getItem("Email");
    axios({
      method: "GET",
      url: "https://localhost:7112/api/v1/User",
    }).then((res) => {
      console.log(res);
      setRows(res.data);
    });
  }, []);

  useEffect(() => {
    //let email = localStorage.getItem("Email");
    axios({
      method: "GET",
      url: "https://localhost:7112/api/v1/User",
    }).then((res) => {
      console.log(res);
      setRows(res.data);
    });
  }, [deleted]);

  return (
    <Paper>
      <TableContainer>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell align="center" colSpan={1}>
                Name
                <IconButton
                  size="small"
                  classname={classes.icon}
                  onClick={sortNameAsc}
                >
                  <AiOutlineArrowDown classname={classes.icon} />
                </IconButton>
                <IconButton
                  size="small"
                  classname={classes.icon}
                  onClick={sortNameDesc}
                >
                  <AiOutlineArrowUp />
                </IconButton>
              </TableCell>
              <TableCell
                className={classes.tabelTitle}
                align="center"
                colSpan={2}
              >
                Email
                <IconButton
                  size="small"
                  classname={classes.icon}
                  onClick={sortEmailAsc}
                >
                  <AiOutlineArrowDown />
                </IconButton>
                <IconButton
                  size="small"
                  classname={classes.icon}
                  onClick={sortEmailDesc}
                >
                  <AiOutlineArrowUp />
                </IconButton>
              </TableCell>

              <TableCell align="center" colSpan={2}>
                Delete
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow>
                    <TableCell align="center" colSpan={1}>
                      {row.lastName} {row.firstName}
                    </TableCell>
                    <TableCell align="center" colSpan={2}>
                      {row.email}
                    </TableCell>
                    <TableCell align="center" colSpan={3}>
                      <IconButton
                        onClick={() => handleDelete(row.email)}
                        className={classes.iconDelete}
                      >
                        <MdOutlineDeleteOutline />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </Paper>
  );
};
export default TableUser;
