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

const TableSport = (props) => {
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

  function handleDelete(name) {
    axios({
      method: "DELETE",
      url: `https://localhost:7112/api/v1/Sport/${name}`,
    })
      .then((res) => {
        console.log(res);
        setDeleted(deleted + 1);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  const sortSportAsc = () => {
    axios({
      method: "GET",
      url: "https://localhost:7112/api/v1/Sport/order/ascent",
    }).then((res) => {
      console.log(res);
      setRows(res.data);
    });
  };

  const sortSportDesc = () => {
    axios({
      method: "GET",
      url: "https://localhost:7112/api/v1/Sport/order/descent",
    }).then((res) => {
      console.log(res);
      setRows(res.data);
    });
  };

  useEffect(() => {
    //let email = localStorage.getItem("Email");
    axios({
      method: "GET",
      url: "https://localhost:7112/api/v1/Sport",
    }).then((res) => {
      console.log(res);
      setRows(res.data);
    });
  }, []);

  useEffect(() => {
    //let email = localStorage.getItem("Email");
    axios({
      method: "GET",
      url: "https://localhost:7112/api/v1/Sport",
    }).then((res) => {
      console.log(res);
      setRows(res.data);
    });
  }, [props.sport, deleted]);

  return (
    <Paper>
      <TableContainer>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell align="center" colSpan={1}>
                Sport{" "}
                <IconButton
                  size="small"
                  classname={classes.icon}
                  onClick={sortSportAsc}
                >
                  <AiOutlineArrowDown classname={classes.icon} />
                </IconButton>
                <IconButton
                  size="small"
                  classname={classes.icon}
                  onClick={sortSportDesc}
                >
                  <AiOutlineArrowUp classname={classes.icon} />
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
                      {row.name}
                    </TableCell>
                    <TableCell align="center" colSpan={2}>
                      <IconButton
                        onClick={() => handleDelete(row.name)}
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
export default TableSport;
