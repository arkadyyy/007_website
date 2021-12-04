import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import DeleteIcon from "@mui/icons-material/Delete";
import UpdateIcon from "@mui/icons-material/Update";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

import FilterListIcon from "@mui/icons-material/FilterList";
import { visuallyHidden } from "@mui/utils";
import UpdateTicket from "./UpdateProduct/UpdateTicket";

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

// This method is created for cross-browser compatibility, if you don't
// need to support IE11, you can use Array.prototype.sort() directly
function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  {
    id: "ticket_type",
    numeric: false,
    disablePadding: false,
    label: "Ticket Type",
  },
  {
    id: "ticket_price",
    numeric: false,
    disablePadding: false,
    label: "Ticket Price",
  },
  {
    id: "discount",
    numeric: false,
    disablePadding: false,
    label: "Discount",
  },
  {
    id: "description",
    numeric: false,
    disablePadding: false,
    label: "Description",
  },
];

function EnhancedTableHead(props) {
  const {
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
  } = props;

  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? "right" : "left"}
            padding={headCell.disablePadding ? "none" : "normal"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component='span' sx={visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

const EnhancedTableToolbar = (props) => {
  const { numSelected, onUpdate, setSelected, selected, onDelete } = props;

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(
              theme.palette.primary.main,
              theme.palette.action.activatedOpacity
            ),
        }),
      }}
    >
      {numSelected > 0 ? (
        <Typography
          sx={{ flex: "1 1 100%" }}
          color='inherit'
          variant='subtitle1'
          component='div'
        >
          {numSelected} selected
        </Typography>
      ) : (
        <Typography
          sx={{ flex: "1 1 100%" }}
          variant='h6'
          id='tableTitle'
          component='div'
        >
          Tickets
        </Typography>
      )}

      {numSelected > 0 ? (
        <>
          <Tooltip onClick={() => setSelected([])} title='Clear Selection'>
            <IconButton>
              <HighlightOffIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title='Delete'>
            <IconButton>
              <DeleteIcon
                onClick={() => {
                  onDelete(selected);
                }}
              />
            </IconButton>
          </Tooltip>
          <Tooltip title='Update'>
            <IconButton
              onClick={() => {
                onUpdate();
              }}
            >
              <UpdateIcon />
            </IconButton>
          </Tooltip>
        </>
      ) : null}
    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};

function Row(props) {
  const { product, setSelected, isItemSelected, selected, onAddImage } = props;
  const [open, setOpen] = React.useState(false);

  const handleClick = (event, product) => {
    console.log("$", product);
    const selectedIndex = selected.indexOf(product);
    let newSelected = [];
    console.log("selected : ", selected);
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, product);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  return (
    <React.Fragment>
      <TableRow
        hover
        onClick={(event) => handleClick(event, product)}
        role='checkbox'
        aria-checked={isItemSelected}
        tabIndex={-1}
        key={product.name}
        selected={isItemSelected}
        sx={{ "& > *": { borderBottom: "unset" } }}
      >
        <TableCell component='th' scope='row'>
          {product.ticket_type}
        </TableCell>
        <TableCell component='th' scope='row'>
          {product.ticket_price} USD
        </TableCell>
        <TableCell align='left'>{product.additional_ticket_discount}</TableCell>
        <TableCell width={250} align='left'>
          {product.description}
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

Row.propTypes = {
  row: PropTypes.shape({
    calories: PropTypes.number.isRequired,
    carbs: PropTypes.number.isRequired,
    fat: PropTypes.number.isRequired,
    history: PropTypes.arrayOf(
      PropTypes.shape({
        amount: PropTypes.number.isRequired,
        customerId: PropTypes.string.isRequired,
        date: PropTypes.string.isRequired,
      })
    ).isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    protein: PropTypes.number.isRequired,
  }).isRequired,
};

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~+

export default function TicketTable({ getTickets }) {
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("price");
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(15);
  const [openAddImage, setOpenAddImage] = React.useState(false);
  const [openUpdate, setOpenUpdate] = React.useState(false);

  const tickets = useSelector((state) => state.tickets);

  const onUpdate = () => {
    setOpenUpdate(true);
  };

  const onUpdateClose = (updated_products) => {
    axios
      .post("http://localhost:8888/update_tickets", updated_products)
      .then(() => {
        console.log("i ran and i ran so fat away");
      });
    setOpenUpdate(false);
  };

  const onDelete = (selected) => {
    axios
      .delete("http://localhost:8888/delete_ticket", { data: selected })
      .then((res) => {
        console.log(res.data);
        setSelected([]);
        getTickets();
      });
  };

  const onAddImage = () => {
    setOpenAddImage(true);
  };

  const onAddImageClose = ({}) => {
    setOpenAddImage(false);
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const isSelected = (product) => {
    return selected.indexOf(product) !== -1;
  };

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - tickets.length) : 0;

  return (
    <Box sx={{ width: "100%" }}>
      <Paper sx={{ width: "100%", mb: 2 }}>
        <EnhancedTableToolbar
          setSelected={setSelected}
          onUpdate={onUpdate}
          onDelete={onDelete}
          numSelected={selected.length}
          selected={selected}
        />
        <TableContainer>
          <Table sx={{ minWidth: 750 }} aria-labelledby='tableTitle'>
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
              rowCount={tickets.length}
            />
            <TableBody>
              {stableSort(tickets, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((product, index) => {
                  const isItemSelected = isSelected(product);
                  return (
                    <Row
                      setSelected={setSelected}
                      selected={selected}
                      key={product.name}
                      product={product}
                      isItemSelected={isItemSelected}
                      onAddImage={onAddImage}
                      onUpdate={onUpdate}
                    />
                  );
                })}
              {emptyRows > 0 && (
                <TableRow>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[15, 20, 35]}
          component='div'
          count={tickets.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      <UpdateTicket
        selected={selected}
        openUpdate={openUpdate}
        onUpdateClose={onUpdateClose}
        setOpenUpdate={setOpenUpdate}
      />
    </Box>
  );
}
