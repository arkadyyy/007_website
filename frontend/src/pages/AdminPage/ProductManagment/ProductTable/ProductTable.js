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
import { visuallyHidden } from "@mui/utils";
import AddImage from "./AddImage";
import UpdateProduct from "../ProductTable/UpdateProduct/UpdateProduct";

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
    id: "name",
    numeric: false,
    disablePadding: false,
    label: "Name",
  },
  {
    id: "price",
    numeric: true,
    disablePadding: false,
    label: "Price",
  },

  {
    id: "description",
    numeric: true,
    disablePadding: false,
    label: "Description",
  },
  {
    id: "inStock",
    numeric: true,
    disablePadding: false,
    label: "In Stock",
  },
  {
    id: "category",
    numeric: true,
    disablePadding: false,
    label: "Category",
  },
  {
    id: "images",
    numeric: true,
    disablePadding: false,
    label: "Images",
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
            align={"left"}
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
          Products
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
    const selectedIndex = selected.indexOf(product.product_id);
    let newSelected = [];
    console.log("selected : ", selected);
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, product.product_id);
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
          {product.product_name}
        </TableCell>
        <TableCell align='left'>{product.price}</TableCell>
        <TableCell width={250} align='left'>
          {product.product_description}
        </TableCell>
        <TableCell align='left'>{product.in_stock}</TableCell>
        <TableCell align='left'>{product.category}</TableCell>
        <TableCell>
          <IconButton
            aria-label='expand row'
            size='small'
            onClick={(e) => {
              e.stopPropagation();
              setOpen(!open);
            }}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout='auto' unmountOnExit>
            <Box sx={{ margin: 1 }}>
              {/* <Typography variant='h6' gutterBottom component='div'>
                Product Images
              </Typography> */}
              <Table size='small' aria-label='purchases'>
                <TableBody>
                  <Box
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                  >
                    {product.images.map((historyRow) => (
                      <Box
                        style={{
                          display: "flex",
                          flexWrap: "wrap",
                          flexDirection: "column",
                          alignItems: "center",
                          width: "150px",
                          height: "150px",
                        }}
                      >
                        <img
                          style={{ width: "100px", height: "100px" }}
                          src={historyRow.picture_url}
                        />
                        <Tooltip title='Delete Image'>
                          <IconButton>
                            <DeleteIcon />
                          </IconButton>
                        </Tooltip>
                      </Box>
                    ))}

                    <Button
                      onClick={() => onAddImage()}
                      style={{
                        alignSelf: "center",
                        textTransform: "none",
                      }}
                    >
                      Add Image
                    </Button>
                  </Box>
                </TableBody>
              </Table>
            </Box>
          </Collapse>
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

export default function ProductTable({ getProducts }) {
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("price");
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(15);
  const [openAddImage, setOpenAddImage] = useState(false);
  const [openUpdate, setOpenUpdate] = useState(false);

  const products = useSelector((state) => state.products);

  const onUpdate = () => {
    setOpenUpdate(true);
  };

  const onUpdateClose = (updated_products) => {
    console.log("####################", updated_products);
    // axios
    //   .post("http://localhost:8888/update_products", updated_products)
    //   .then(() => {
    //     console.log("i ran and i ran so fat away");
    //     getProducts();
    //   });
    setOpenUpdate(false);
  };

  const onDelete = (selected) => {
    axios
      .delete("http://localhost:8888/delete_products", { data: selected })
      .then(() => {
        getProducts();
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

  const isSelected = (product_id) => {
    return selected.indexOf(product_id) !== -1;
  };

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - products.length) : 0;

  useEffect(() => {
    console.log("##products : ", products);
  }, [products]);

  useEffect(() => {
    setSelected([]);
  }, [openUpdate]);

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
              rowCount={products.length}
            />
            <TableBody>
              {stableSort(products, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((product, index) => {
                  const isItemSelected = isSelected(product.product_id);
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
          count={products.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>

      <AddImage openAddImage={openAddImage} onAddImageClose={onAddImageClose} />
      <UpdateProduct
        selected={selected}
        openUpdate={openUpdate}
        onUpdateClose={onUpdateClose}
        setOpenUpdate={setOpenUpdate}
      />
    </Box>
  );
}
