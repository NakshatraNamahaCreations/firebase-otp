import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Button,
  TablePagination,
} from "@mui/material";
import { Link } from "react-router-dom";
// Import your CSS file for styling

const CombinedComponent = () => {
  const [keywords, setKeywords] = useState("");
  const [TotaSearchvolume, setTotaSearchvolume] = useState([]);
  const [currentPage, setCurrentPage] = useState(0); // Default to 0 for TablePagination
  const [itemsPerPage, setItemsPerPage] = useState(25); // Default items per page
  const [error, setError] = useState("");
  const [resultData, setResultData] = useState([]);
  const [dailySales, setDailySales] = useState(0);

  console.log("resultData", resultData);

  const search = async () => {
    if (!keywords) {
      setError("Please enter a keyword");
      return;
    }

    try {
      const res = await axios.get(
        `https://api.proleverageadmin.in/api/amazon/affiliatekeyword`,
        {
          params: { keywords },
        }
      );

      if (res.status === 200) {
        setResultData(res.data.amazonData.SearchResult.Items || []);

        setError("");
        if (res.data.amazonData.SearchResult.Items.length > 0) {
          const itemPrice =
            res.data.amazonData.SearchResult.Items[0]?.Offers?.Listings[0]
              ?.Price?.Amount || 0;
          calculateDailySales(itemPrice);
        }
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setError("Error fetching data. Please try again.");
    }
  };

  console.log("resultData", resultData);

  // Pagination logic
  const handleChangePage = (event, newPage) => {
    setCurrentPage(newPage);
  };

  const calculateDailySales = (itemPrice) => {
    const estimatedDailySales = itemPrice * 0.1;
    setDailySales(estimatedDailySales);
  };

  const handleChangeRowsPerPage = (event) => {
    setItemsPerPage(parseInt(event.target.value, 10));
    setCurrentPage(0); // Reset to first page when items per page changes
  };

  const indexOfLastItem = (currentPage + 1) * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = TotaSearchvolume.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  return (
    <div className="container">
      <div className="row justify-content-center web-tools">
        <div className="col-md-12 p-3">
          <div className="row mt-3 mb-4" style={{ justifyContent: "center" }}>
            <div className="col-md-2">
              {/* <Link to="/asin-code" style={{ textDecoration: "none" }}> */}
              <Link to="/" style={{ textDecoration: "none" }}>
                <div
                  className="poppins-regular"
                  style={{
                    // backgroundColor: "darkblue",
                    border: "1px solid darkblue",
                    color: "black",
                    textAlign: "center",
                    padding: "10px",
                    borderRadius: "5px",
                    fontSize: "14px",
                  }}
                >
                  ASIN/Product
                </div>
              </Link>
            </div>

            <div className="col-md-2">
              <Link to="/product-search" style={{ textDecoration: "none" }}>
                <div
                  className="poppins-regular"
                  style={{
                    backgroundColor: "darkblue",
                    color: "white",
                    textAlign: "center",
                    padding: "10px",
                    borderRadius: "5px",
                    fontSize: "14px",
                  }}
                >
                  Keyword
                </div>
              </Link>
            </div>
          </div>
          <div className="search-container">
            <div className="row">
              <div className="col-md-10">
                <input
                  className="input_box"
                  type="text"
                  placeholder="Search by ASIN, Product Name, or Category"
                  value={keywords}
                  onChange={(e) => setKeywords(e.target.value)}
                  style={{ marginBottom: "20px" }}
                />
              </div>
              <div className="col-md-2">
                <button
                  className="btn btn-primary search_icon"
                  type="submit"
                  onClick={search}
                >
                  Search
                </button>
              </div>
            </div>
            {/* {currentItems.length > 0 && (
              <>
                <TableContainer component={Paper} className="table-container">
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Keyword</TableCell>
                        <TableCell>Search Volume</TableCell>
                        <TableCell>CPC</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {currentItems.map((item, index) => (
                        <TableRow key={index}>
                          <TableCell>{item.keyword}</TableCell>
                          <TableCell>{item.searchVolume}</TableCell>
                          <TableCell>{item.cpc}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>

                <TablePagination
                  rowsPerPageOptions={[10, 25, 50, 100]}
                  component="div"
                  count={TotaSearchvolume.length}
                  rowsPerPage={itemsPerPage}
                  page={currentPage}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                />
              </>
            )}
            {error && (
              <div className="alert alert-danger" role="alert">
                {error}
              </div>
            )} */}
            {resultData.length > 0 ? (
              <div>
                {resultData?.map((item) => (
                  <Link
                    to="/product-details"
                    state={{ data: item, dailySales: dailySales }}
                    style={{ textDecoration: "none", color: "black" }}
                  >
                    <div className="row mt-3" key={item.ASIN}>
                      <div className="col-4">
                        {item.Images?.Primary?.Medium?.URL && (
                          <div
                            className="d-flex"
                            style={{ justifyContent: "center" }}
                          >
                            <img
                              // onClick={() =>
                              //   handleProductClick(
                              //     `https://www.amazon.in/dp/${item.ASIN}`
                              //   )
                              // }

                              src={item.Images.Primary.Medium.URL}
                              alt={item.Title}
                              style={{ height: "100px" }}
                            />
                          </div>
                        )}
                      </div>
                      <div
                        className="col-8 d-flex"
                        style={{
                          flexDirection: "column",
                          justifyContent: "center",
                        }}
                      >
                        <div
                          className="poppins-regular"
                          style={{
                            color: "grey",
                            display: "-webkit-box",
                            WebkitLineClamp: 1,
                            WebkitBoxOrient: "vertical",
                            overflow: "hidden",
                          }}
                        >
                          {item.ItemInfo?.Title.DisplayValue}
                        </div>
                        <div
                          className="poppins-regular"
                          style={{
                            color: "grey",
                            display: "-webkit-box",
                            WebkitLineClamp: 1,
                            WebkitBoxOrient: "vertical",
                            overflow: "hidden",
                          }}
                        >
                          {item.ASIN}
                        </div>

                        {item.BrowseNodeInfo?.BrowseNodes[0]?.SalesRank && (
                          <div
                            className="poppins-regular"
                            style={{
                              color: "grey",
                              display: "-webkit-box",
                              WebkitLineClamp: 2,
                              WebkitBoxOrient: "vertical",
                              overflow: "hidden",
                            }}
                          >
                            rank :{" "}
                            {item.BrowseNodeInfo.BrowseNodes[0].SalesRank}
                          </div>
                        )}
                        <div className="poppins-medium">
                          price : ₹{" "}
                          {item.Offers?.Listings[0]?.Price?.Amount || 0}
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              // <div className="poppins-medium mt-3" style={{ color: "red" }}>
              //   No data found
              // </div>
              ""
            )}

            {resultData.length === 0 && (
              <div className="row mt-2">
                <div className="poppins-black pb-4">Top Products</div>
                <div className="col-2">
                  <div className="d-flex" style={{ justifyContent: "center" }}>
                    <img
                      src="./images/yogamat.jpg"
                      alt="loading....."
                      style={{
                        width: "80px",
                        height: "80px",
                        borderRadius: "10px",
                      }}
                    />
                  </div>

                  <div className="poppins-regular pt-1 text-center">
                    Yoga Mat
                  </div>
                </div>
                <div className="col-2">
                  <div className="d-flex" style={{ justifyContent: "center" }}>
                    <img
                      src="./images/ear.jpg"
                      alt="loading....."
                      style={{
                        width: "80px",
                        height: "80px",
                        borderRadius: "10px",
                      }}
                    />
                  </div>
                  <div className="poppins-regular pt-1 text-center">
                    Ear buds
                  </div>
                </div>
                <div className="col-2">
                  <div className="d-flex" style={{ justifyContent: "center" }}>
                    <img
                      src="./images/mobile.jpg"
                      alt="loading....."
                      style={{
                        width: "80px",
                        height: "80px",
                        borderRadius: "10px",
                      }}
                    />
                  </div>
                  <div className="poppins-regular pt-1 text-center">
                    Mobiles
                  </div>
                </div>

                <div className="col-2 mt-3">
                  <div className="d-flex" style={{ justifyContent: "center" }}>
                    <img
                      src="./images/dress.jpg"
                      alt="loading....."
                      style={{
                        width: "80px",
                        height: "80px",
                        borderRadius: "10px",
                      }}
                    />
                  </div>
                  <div className="poppins-regular pt-1 text-center">Tables</div>
                </div>

                <div className="col-2 mt-3">
                  <div className="d-flex" style={{ justifyContent: "center" }}>
                    <img
                      src="./images/jewellery.png"
                      alt="loading....."
                      style={{
                        width: "80px",
                        height: "80px",
                        borderRadius: "10px",
                      }}
                    />
                  </div>
                  <div className="poppins-regular pt-1 text-center">
                    Jewellery
                  </div>
                </div>

                <div className="col-2 mt-3">
                  <div className="d-flex" style={{ justifyContent: "center" }}>
                    <img
                      src="./images/pen.png"
                      alt="loading....."
                      style={{
                        width: "80px",
                        height: "80px",
                        borderRadius: "10px",
                      }}
                    />
                  </div>
                  <div className="poppins-regular pt-1 text-center">Pen</div>
                </div>

                <div className="col-2 mt-3">
                  <div className="d-flex" style={{ justifyContent: "center" }}>
                    <img
                      src="./images/shoes.png"
                      alt="loading....."
                      style={{
                        width: "80px",
                        height: "80px",
                        borderRadius: "10px",
                      }}
                    />
                  </div>
                  <div className="poppins-regular pt-1 text-center">Shoes</div>
                </div>

                <div className="col-2 mt-3">
                  <div className="d-flex" style={{ justifyContent: "center" }}>
                    <img
                      src="./images/toy.jfif"
                      alt="loading....."
                      style={{
                        width: "80px",
                        height: "80px",
                        borderRadius: "10px",
                      }}
                    />
                  </div>
                  <div className="poppins-regular pt-1 text-center">
                    Toys & Games
                  </div>
                </div>

                <div className="col-2 mt-3">
                  <div className="d-flex" style={{ justifyContent: "center" }}>
                    <img
                      src="./images/car.jpg"
                      alt="loading....."
                      style={{
                        width: "80px",
                        height: "80px",
                        borderRadius: "10px",
                      }}
                    />
                  </div>
                  <div className="poppins-regular pt-1 text-center">
                    Car & Motorbike
                  </div>
                </div>

                <div className="col-2 mt-3">
                  <div className="d-flex" style={{ justifyContent: "center" }}>
                    <img
                      src="./images/electronic.png"
                      alt="loading....."
                      style={{
                        width: "80px",
                        height: "80px",
                        borderRadius: "10px",
                      }}
                    />
                  </div>
                  <div className="poppins-regular pt-1 text-center">
                    Electronics
                  </div>
                </div>

                <div className="col-2 mt-3">
                  <div className="d-flex" style={{ justifyContent: "center" }}>
                    <img
                      src="./images/bp.jfif"
                      alt="loading....."
                      style={{
                        width: "80px",
                        height: "80px",
                        borderRadius: "10px",
                      }}
                    />
                  </div>
                  <div className="poppins-regular pt-1 text-center">
                    Health & Personal Care
                  </div>
                </div>

                <div className="col-2 mt-3">
                  <div className="d-flex" style={{ justifyContent: "center" }}>
                    <img
                      src="./images/science.jfif"
                      alt="loading....."
                      style={{
                        width: "80px",
                        height: "80px",
                        borderRadius: "10px",
                      }}
                    />
                  </div>
                  <div className="poppins-regular pt-1 text-center">
                    Industrial & Scientific
                  </div>
                </div>

                <div className="col-2 mt-3">
                  <div className="d-flex" style={{ justifyContent: "center" }}>
                    <img
                      src="./images/music.png"
                      alt="loading....."
                      style={{
                        width: "80px",
                        height: "80px",
                        borderRadius: "10px",
                      }}
                    />
                  </div>
                  <div className="poppins-regular pt-1 text-center">
                    Musical Instruments
                  </div>
                </div>

                <div className="col-2 mt-3">
                  <div className="d-flex" style={{ justifyContent: "center" }}>
                    <img
                      src="./images/pet.png"
                      alt="loading....."
                      style={{
                        width: "80px",
                        height: "80px",
                        borderRadius: "10px",
                      }}
                    />
                  </div>
                  <div className="poppins-regular pt-1 text-center">
                    Pet Supplies
                  </div>
                </div>

                <div className="col-2 mt-3">
                  <div className="d-flex" style={{ justifyContent: "center" }}>
                    <img
                      src="./images/sports.png"
                      alt="loading....."
                      style={{
                        width: "80px",
                        height: "80px",
                        borderRadius: "10px",
                      }}
                    />
                  </div>
                  <div className="poppins-regular pt-1 text-center">
                    Sports, Fitness & Outdoor
                  </div>
                </div>

                <div className="col-2 mt-3">
                  <div className="d-flex" style={{ justifyContent: "center" }}>
                    <img
                      src="./images/watch.jpg"
                      alt="loading....."
                      style={{
                        width: "80px",
                        height: "80px",
                        borderRadius: "10px",
                      }}
                    />
                  </div>
                  <div className="poppins-regular pt-1 text-center">Watch</div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="mobile-tools mt-3">
        <div className="row" style={{}}>
          <div className="col-6">
            <Link to="/asin-code" style={{ textDecoration: "none" }}>
              <div
                className="poppins-regular"
                style={{
                  // backgroundColor: "darkblue",
                  border: "1px solid darkblue",
                  color: "black",
                  textAlign: "center",
                  padding: "10px",
                  borderRadius: "5px",
                  fontSize: "14px",
                }}
              >
                ASIN/Product
              </div>
            </Link>
          </div>

          <div className="col-6">
            <Link to="/product-search" style={{ textDecoration: "none" }}>
              <div
                className="poppins-regular"
                style={{
                  backgroundColor: "darkblue",
                  color: "white",
                  textAlign: "center",
                  padding: "10px",
                  borderRadius: "5px",
                  fontSize: "14px",
                }}
              >
                Keyword
              </div>
            </Link>
          </div>
        </div>

        <div className="row mt-3">
          <div className="col-10">
            <i
              className="fa-solid fa-magnifying-glass"
              style={{
                position: "absolute",
                marginTop: "14px",
                marginLeft: "15px",
              }}
            ></i>
            <input
              type="text"
              className="col-12 poppins-regular"
              placeholder="Keyword Search"
              value={keywords}
              onChange={(e) => setKeywords(e.target.value)}
              style={{
                outline: "none",
                height: "45px",
                paddingLeft: "45px",
                fontSize: "16px",
                borderRadius: "5px",
                border: "1px solid lightgrey",
              }}
            />
          </div>
          <div className="col-2">
            <i
              onClick={search}
              className="fa-solid fa-magnifying-glass"
              style={{
                fontSize: "20px",
                backgroundColor: "darkblue",
                color: "white",
                padding: "12px",
                borderRadius: "5px",
              }}
            ></i>
          </div>
        </div>

        <div className="mb-5">
          {resultData.length > 0 ? (
            <div>
              {resultData?.map((item) => (
                <Link
                  to="/product-details"
                  state={{ data: item, dailySales: dailySales }}
                  style={{ textDecoration: "none", color: "black" }}
                >
                  <div className="row mt-3" key={item.ASIN}>
                    <div className="col-4">
                      {item.Images?.Primary?.Medium?.URL && (
                        <img
                          // onClick={() =>
                          //   handleProductClick(
                          //     `https://www.amazon.in/dp/${item.ASIN}`
                          //   )
                          // }
                          src={item.Images.Primary.Medium.URL}
                          alt={item.Title}
                          style={{ width: "100%", height: "100px" }}
                        />
                      )}
                    </div>
                    <div
                      className="col-8 d-flex"
                      style={{
                        flexDirection: "column",
                        justifyContent: "center",
                      }}
                    >
                      <div
                        className="poppins-regular"
                        style={{
                          color: "grey",
                          display: "-webkit-box",
                          WebkitLineClamp: 1,
                          WebkitBoxOrient: "vertical",
                          overflow: "hidden",
                        }}
                      >
                        {item.ItemInfo?.Title.DisplayValue}
                      </div>
                      <div
                        className="poppins-regular"
                        style={{
                          color: "grey",
                          display: "-webkit-box",
                          WebkitLineClamp: 1,
                          WebkitBoxOrient: "vertical",
                          overflow: "hidden",
                        }}
                      >
                        {item.ASIN}
                      </div>

                      {item.BrowseNodeInfo?.BrowseNodes[0]?.SalesRank && (
                        <div
                          className="poppins-regular"
                          style={{
                            color: "grey",
                            display: "-webkit-box",
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: "vertical",
                            overflow: "hidden",
                          }}
                        >
                          rank : {item.BrowseNodeInfo.BrowseNodes[0].SalesRank}
                        </div>
                      )}
                      <div className="poppins-medium">
                        price : ₹ {item.Offers?.Listings[0]?.Price?.Amount || 0}
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            // <div className="poppins-medium mt-3" style={{ color: "red" }}>
            //   No data found
            // </div>
            ""
          )}
        </div>

        {resultData.length === 0 && (
          <div className="row mt-2">
            <div className="poppins-black pb-2">Top Products</div>
            <div className="col-4">
              <div className="d-flex" style={{ justifyContent: "center" }}>
                <img
                  src="./images/yogamat.jpg"
                  alt="loading....."
                  style={{
                    width: "80px",
                    height: "80px",
                    borderRadius: "10px",
                  }}
                />
              </div>

              <div className="poppins-regular pt-1 text-center">Yoga Mat</div>
            </div>
            <div className="col-4">
              <div className="d-flex" style={{ justifyContent: "center" }}>
                <img
                  src="./images/ear.jpg"
                  alt="loading....."
                  style={{
                    width: "80px",
                    height: "80px",
                    borderRadius: "10px",
                  }}
                />
              </div>
              <div className="poppins-regular pt-1 text-center">Ear buds</div>
            </div>
            <div className="col-4">
              <div className="d-flex" style={{ justifyContent: "center" }}>
                <img
                  src="./images/mobile.jpg"
                  alt="loading....."
                  style={{
                    width: "80px",
                    height: "80px",
                    borderRadius: "10px",
                  }}
                />
              </div>
              <div className="poppins-regular pt-1 text-center">Mobiles</div>
            </div>

            <div className="col-4 mt-3">
              <div className="d-flex" style={{ justifyContent: "center" }}>
                <img
                  src="./images/dress.jpg"
                  alt="loading....."
                  style={{
                    width: "80px",
                    height: "80px",
                    borderRadius: "10px",
                  }}
                />
              </div>
              <div className="poppins-regular pt-1 text-center">Tables</div>
            </div>

            <div className="col-4 mt-3">
              <div className="d-flex" style={{ justifyContent: "center" }}>
                <img
                  src="./images/jewellery.png"
                  alt="loading....."
                  style={{
                    width: "80px",
                    height: "80px",
                    borderRadius: "10px",
                  }}
                />
              </div>
              <div className="poppins-regular pt-1 text-center">Jewellery</div>
            </div>

            <div className="col-4 mt-3">
              <div className="d-flex" style={{ justifyContent: "center" }}>
                <img
                  src="./images/pen.png"
                  alt="loading....."
                  style={{
                    width: "80px",
                    height: "80px",
                    borderRadius: "10px",
                  }}
                />
              </div>
              <div className="poppins-regular pt-1 text-center">Pen</div>
            </div>

            <div className="col-4 mt-3">
              <div className="d-flex" style={{ justifyContent: "center" }}>
                <img
                  src="./images/shoes.png"
                  alt="loading....."
                  style={{
                    width: "80px",
                    height: "80px",
                    borderRadius: "10px",
                  }}
                />
              </div>
              <div className="poppins-regular pt-1 text-center">Shoes</div>
            </div>

            <div className="col-4 mt-3">
              <div className="d-flex" style={{ justifyContent: "center" }}>
                <img
                  src="./images/toy.jfif"
                  alt="loading....."
                  style={{
                    width: "80px",
                    height: "80px",
                    borderRadius: "10px",
                  }}
                />
              </div>
              <div className="poppins-regular pt-1 text-center">
                Toys & Games
              </div>
            </div>

            <div className="col-4 mt-3">
              <div className="d-flex" style={{ justifyContent: "center" }}>
                <img
                  src="./images/car.jpg"
                  alt="loading....."
                  style={{
                    width: "80px",
                    height: "80px",
                    borderRadius: "10px",
                  }}
                />
              </div>
              <div className="poppins-regular pt-1 text-center">
                Car & Motorbike
              </div>
            </div>

            <div className="col-4 mt-3">
              <div className="d-flex" style={{ justifyContent: "center" }}>
                <img
                  src="./images/electronic.png"
                  alt="loading....."
                  style={{
                    width: "80px",
                    height: "80px",
                    borderRadius: "10px",
                  }}
                />
              </div>
              <div className="poppins-regular pt-1 text-center">
                Electronics
              </div>
            </div>

            <div className="col-4 mt-3">
              <div className="d-flex" style={{ justifyContent: "center" }}>
                <img
                  src="./images/bp.jfif"
                  alt="loading....."
                  style={{
                    width: "80px",
                    height: "80px",
                    borderRadius: "10px",
                  }}
                />
              </div>
              <div className="poppins-regular pt-1 text-center">
                Health & Personal Care
              </div>
            </div>

            <div className="col-4 mt-3">
              <div className="d-flex" style={{ justifyContent: "center" }}>
                <img
                  src="./images/science.jfif"
                  alt="loading....."
                  style={{
                    width: "80px",
                    height: "80px",
                    borderRadius: "10px",
                  }}
                />
              </div>
              <div className="poppins-regular pt-1 text-center">
                Industrial & Scientific
              </div>
            </div>

            <div className="col-4 mt-3">
              <div className="d-flex" style={{ justifyContent: "center" }}>
                <img
                  src="./images/music.png"
                  alt="loading....."
                  style={{
                    width: "80px",
                    height: "80px",
                    borderRadius: "10px",
                  }}
                />
              </div>
              <div className="poppins-regular pt-1 text-center">
                Musical Instruments
              </div>
            </div>

            <div className="col-4 mt-3">
              <div className="d-flex" style={{ justifyContent: "center" }}>
                <img
                  src="./images/pet.png"
                  alt="loading....."
                  style={{
                    width: "80px",
                    height: "80px",
                    borderRadius: "10px",
                  }}
                />
              </div>
              <div className="poppins-regular pt-1 text-center">
                Pet Supplies
              </div>
            </div>

            <div className="col-4 mt-3">
              <div className="d-flex" style={{ justifyContent: "center" }}>
                <img
                  src="./images/sports.png"
                  alt="loading....."
                  style={{
                    width: "80px",
                    height: "80px",
                    borderRadius: "10px",
                  }}
                />
              </div>
              <div className="poppins-regular pt-1 text-center">
                Sports, Fitness & Outdoor
              </div>
            </div>

            <div className="col-4 mt-3">
              <div className="d-flex" style={{ justifyContent: "center" }}>
                <img
                  src="./images/watch.jpg"
                  alt="loading....."
                  style={{
                    width: "80px",
                    height: "80px",
                    borderRadius: "10px",
                  }}
                />
              </div>
              <div className="poppins-regular pt-1 text-center">Watch</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CombinedComponent;
