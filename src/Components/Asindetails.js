import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

function Asindetails() {
  const location = useLocation();
  const { data, dailySales } = location.state || {};
  console.log("data=====suman", dailySales);

  const [referralFee, setReferralFee] = useState(0);
  const [closingFee, setClosingFee] = useState(0);
  const [sales, setSales] = useState(0);
  const [costPerUnit, setCostPerUnit] = useState(0);
  const [loading, setLoading] = useState(false);

  // Equivalent to initState
  useEffect(() => {
    calculateReferralFee();
    calculateClosingFee();
    calculateSales();

    // Equivalent of Future.delayed
    // setTimeout(() => {
    calculateCostPerUnit();
    // }, 1200);
  }, [costPerUnit]); // Empty array to run effect only once on component mount

  const calculateReferralFee = () => {
    console.log("Price1 - ", data.Offers?.Listings[0]?.Price?.Amount || 0);
    let price = parseFloat(data.Offers?.Listings[0]?.Price?.Amount || 0);
    let finalPrice;
    console.log("Price2 - ", price);

    if (price <= 299) {
      finalPrice = price * 0.05;
      finalPrice = finalPrice * 1.18;
      finalPrice = parseFloat(finalPrice.toFixed(2));
      console.log("Price3 - ", finalPrice);
      setReferralFee(finalPrice);
      console.log("Price4 - ", finalPrice);
    } else if (price >= 300 && price <= 500) {
      finalPrice = price * 0.09;
      finalPrice = finalPrice * 1.18;
      finalPrice = parseFloat(finalPrice.toFixed(2));
      console.log("Price5 - ", finalPrice);
      setReferralFee(finalPrice);
      console.log("Price6 - ", finalPrice);
    } else if (price > 500) {
      finalPrice = price * 0.13;
      finalPrice = finalPrice * 1.18;
      finalPrice = parseFloat(finalPrice.toFixed(2));
      console.log("Price7 - ", finalPrice);
      setReferralFee(finalPrice);
      console.log("Price8 - ", finalPrice);
    }
  };

  const calculateClosingFee = () => {
    let price = parseFloat(data.Offers?.Listings[0]?.Price?.Amount || 0);
    let finalPrice;

    if (price <= 250) {
      finalPrice = 4 * 1.18;
      setClosingFee(finalPrice);
    } else if (price >= 251 && price <= 500) {
      setClosingFee(9);
    } else if (price >= 501 && price <= 1000) {
      setClosingFee(30);
    } else {
      setClosingFee(61);
    }
  };

  const calculateSales = () => {
    let myRank = parseInt(
      data.BrowseNodeInfo?.WebsiteSalesRank.SalesRank || "1000"
    );
    let mySales = 0;

    if (myRank <= 10) {
      mySales = (238000 / myRank / 80) * 3;
      setSales(Math.round(mySales));
    } else if (myRank >= 11 && myRank <= 50) {
      mySales = (238000 / myRank / 25) * 3;
      setSales(Math.round(mySales));
    } else if (myRank >= 51 && myRank <= 100) {
      mySales = (238000 / myRank / 15) * 3;
      setSales(Math.round(mySales));
    } else if (myRank >= 101 && myRank <= 1000) {
      mySales = (238000 / myRank / 10) * 3;
      setSales(Math.round(mySales));
    } else {
      mySales = (238000 / myRank / 4) * 3;
      setSales(Math.round(mySales));
    }
  };

  const calculateCostPerUnit = () => {
    const cost = (referralFee + closingFee + 80) * 1.18;
    setCostPerUnit(cost);
    console.log("CostPerUnit = ", cost);
  };

  const copyToClipboard = (asin) => {
    // Check if the Clipboard API is available
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(asin).then(
        () => {
          alert("ASIN copied to clipboard!");
        },
        (err) => {
          console.error("Failed to copy: ", err);
          alert("Failed to copy ASIN. Please try again.");
        }
      );
    } else {
      // Fallback approach: Select and copy text manually
      fallbackCopyTextToClipboard(asin);
    }
  };

  // Fallback function to copy text manually if Clipboard API is not available
  const fallbackCopyTextToClipboard = (text) => {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();

    try {
      const successful = document.execCommand("copy");
      const msg = successful
        ? "ASIN copied to clipboard!"
        : "Failed to copy ASIN";
      alert(msg);
    } catch (err) {
      console.error("Fallback: Unable to copy", err);
    }

    document.body.removeChild(textArea);
  };

  const handleProductClick = (url) => {
    window.location.href = url;
  };

  return (
    <div className="container">
      <div className="row" style={{ justifyContent: "center" }}>
        <div className="col-12 col-md-8">
          <div
            className="mt-4 p-3 mb-4"
            style={{ backgroundColor: "#012a4a", borderRadius: "10px" }}
          >
            <div className="row">
              <div className="col-4 col-md-2">
                {data.Images?.Primary?.Medium?.URL && (
                  <div className="d-flex" style={{ justifyContent: "center" }}>
                    <img
                      src={data.Images.Primary.Medium.URL}
                      alt={data.Title}
                      style={{ height: "100px" }}
                    />
                  </div>
                )}
              </div>

              <div
                className="col-8 d-flex col-md-10"
                style={{
                  flexDirection: "column",
                  justifyContent: "center",
                }}
              >
                <div
                  className="poppins-regular"
                  style={{
                    color: "white",
                    display: "-webkit-box",
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                  }}
                >
                  {data.ItemInfo?.Title.DisplayValue}
                </div>
                <div
                  className="poppins-regular pt-2 pb-2"
                  style={{ color: "white" }}
                >
                  {" "}
                  {data.ASIN}{" "}
                  <span onClick={() => copyToClipboard(data.ASIN)}>
                    <i className="fa-regular fa-copy mx-2"></i>
                  </span>
                </div>
                <div className="poppins-medium" style={{ color: "white" }}>
                  ₹ {data.Offers?.Listings[0]?.Price?.Amount || 0}
                </div>
              </div>
            </div>
            {/* <div className="poppins-black">Asin Details Page</div>
        <p>Referral Fee: {referralFee}</p>
        <p>Closing Fee: {closingFee}</p>
        <p>Sales: {sales}</p>
        <p>Cost Per Unit: {costPerUnit}</p> */}
          </div>

          <div className="row mb-3">
            <div className="col-6">
              <div
                className="p-2"
                style={{ backgroundColor: "lightgrey", borderRadius: "5px" }}
              >
                <div
                  className="poppins-regular text-center"
                  style={{ fontWeight: "bold", fontSize: "13px" }}
                >
                  Category BSR
                </div>

                <div
                  className="d-flex mt-3"
                  style={{ justifyContent: "center" }}
                >
                  <div
                    className="poppins-regular"
                    style={{
                      fontSize: "11px",
                      color: "#012a4a",
                      fontWeight: "bold",
                    }}
                  >
                    End Tables{" "}
                    <span
                      className="poppins-regular"
                      style={{
                        fontSize: "11px",
                      }}
                    >
                      {data.BrowseNodeInfo?.BrowseNodes[0]?.SalesRank ?? 0}
                    </span>
                  </div>
                </div>

                <div
                  className="d-flex mt-3"
                  style={{ justifyContent: "center" }}
                >
                  <div
                    className="poppins-regular"
                    style={{
                      fontSize: "11px",
                      color: "#012a4a",
                      fontWeight: "bold",
                    }}
                  >
                    Overall
                    <span
                      className="poppins-regular mx-2"
                      style={{
                        fontSize: "11px",
                      }}
                    >
                      #{data.BrowseNodeInfo?.WebsiteSalesRank.SalesRank || 0}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-6">
              <div
                className="p-2"
                style={{
                  backgroundColor: "lightgrey",
                  borderRadius: "5px",
                  height: "100px",
                }}
              >
                <div
                  className="poppins-regular text-center"
                  style={{
                    fontWeight: "bold",
                    fontSize: "13px",
                  }}
                >
                  Sales Estimate
                </div>

                <div
                  className="poppins-regular text-center mt-3"
                  style={{
                    fontSize: "11px",
                    color: "#012a4a",
                    fontWeight: "bold",
                  }}
                >
                  {sales}{" "}
                  <span>
                    <i
                      className="fa-solid fa-arrow-up mx-2"
                      style={{ fontSize: "14px", color: "blue" }}
                    ></i>
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div
            className="p-2 mb-3"
            style={{
              backgroundColor: "lightgrey",
              borderRadius: "5px",
            }}
          >
            <div
              className="poppins-regular text-center"
              style={{
                fontWeight: "bold",
                fontSize: "13px",
              }}
            >
              Amazon Fee Estimation
            </div>

            <div
              className="poppins-regular text-center mt-2"
              style={{ fontSize: "13px", color: "blue" }}
            >
              Referral Fee - {Math.round(referralFee)}
            </div>

            <div
              className="poppins-regular text-center mt-2"
              style={{ fontSize: "13px", color: "blue" }}
            >
              Closing Fee - {Math.round(closingFee)}
            </div>

            <div
              className="poppins-regular text-center mt-2"
              style={{ fontSize: "13px", color: "blue" }}
            >
              FBA Fee - {Math.round(dailySales)}
            </div>
          </div>

          <div
            className="d-flex p-3 mb-3"
            style={{
              backgroundColor: "lightgrey",
              justifyContent: "space-between",
              borderRadius: "10px",
            }}
          >
            <div
              className="poppins-regular"
              style={{ fontWeight: "bold", fontSize: "13px" }}
            >
              Cost Per Unit
            </div>
            <div
              className="poppins-regular"
              style={{ fontWeight: "bold", fontSize: "13px" }}
            >
              ₹ {Math.round(costPerUnit)}
            </div>
          </div>

          <div
            onClick={() =>
              handleProductClick(`https://www.amazon.in/dp/${data?.ASIN}`)
            }
            className="poppins-black text-center mb-3 mt-4"
            style={{
              backgroundColor: "#012a4a",
              padding: "10px",
              color: "white",
              borderRadius: "5px",
            }}
          >
            Go To Amazon
          </div>
        </div>
      </div>
    </div>
  );
}
export default Asindetails;
