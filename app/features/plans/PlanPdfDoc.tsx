import {
  Document,
  Page,
  StyleSheet,
  Font,
  Text,
  Image,
  View,
} from "@react-pdf/renderer";
import { InitialCustomerObject, PlanObject } from "@/app/lib/interfaces";
import { formatNumber } from "@/app/utilities/formatNumber";
import Loading from "../loading/Loading";
import moment from "jalali-moment";
import { useEffect } from "react";

type Props = {
  plan: PlanObject;
  customer: InitialCustomerObject;
  totalCheck: boolean;
  afterDiscount: boolean;
};

const PlanPdfDoc = (props: Props) => {
  const { plan, customer, totalCheck, afterDiscount } = props;

  Font.register({
    family: "Anjoman",
    fonts: [
      {
        src: "/fonts/AnjomanFaNum-Medium.ttf",
        fontWeight: 400,
        color: "white",
      },
    ],
  });

  Font.register({
    family: "Arial",
    fonts: [
      {
        src: "/fonts/arialbd_0.ttf",
        fontWeight: 500,
        color: "white",
      },
    ],
  });

  const columnsHeader = [
    {
      content: "جمع دوره",
      width: `${totalCheck ? "10%" : "0%"}`,
    },
    {
      content: "پس از تخفیف",
      width: `${afterDiscount ? (totalCheck ? "8%" : "10%") : "0%"}`,
    },
    {
      content: "تعرفه ماهیانه",
      width: `${
        totalCheck && afterDiscount
          ? "8%"
          : totalCheck || afterDiscount
          ? "9%"
          : "10%"
      }`,
    },
    {
      content: "اکران",
      width: `${
        totalCheck && afterDiscount
          ? "4%"
          : totalCheck || afterDiscount
          ? "5%"
          : "6%"
      }`,
    },
    {
      content: "تاریخ پایان",
      width: `${
        totalCheck && afterDiscount
          ? "7%"
          : totalCheck || afterDiscount
          ? "8%"
          : "9%"
      }`,
    },
    {
      content: "تاریخ شروع",
      width: `${
        totalCheck && afterDiscount
          ? "7%"
          : totalCheck || afterDiscount
          ? "8%"
          : "9%"
      }`,
    },
    {
      content: "مساحت",
      width: `${
        totalCheck && afterDiscount
          ? "4%"
          : totalCheck || afterDiscount
          ? "5%"
          : "6%"
      }`,
    },
    {
      content: "نوع سازه",
      width: `${
        totalCheck && afterDiscount
          ? "6%"
          : totalCheck || afterDiscount
          ? "7%"
          : "8%"
      }`,
    },
    {
      content: "نشانی",
      width: `${
        totalCheck && afterDiscount
          ? "32%"
          : totalCheck || afterDiscount
          ? "33%"
          : "34%"
      }`,
    },
    {
      content: "مسیر",
      width: `${
        totalCheck && afterDiscount
          ? "6%"
          : totalCheck || afterDiscount
          ? "7%"
          : "8%"
      }`,
    },
    {
      content: "سامانه",
      width: `${
        totalCheck && afterDiscount
          ? "5%"
          : totalCheck || afterDiscount
          ? "5%"
          : "7%"
      }`,
    },
    {
      content: "ردیف",
      width: "3%",
    },
  ];
  const fontColor = "white";

  const styles = StyleSheet.create({
    body: {
      padding: 35,
      fontFamily: "Anjoman",
    },
    title: {
      fontSize: 24,
      textAlign: "center",
      color: fontColor,
    },
    subtitle: {
      fontSize: 14,
      margin: 12,
      textAlign: "center",
      color: fontColor,
    },
    smallText: {
      fontSize: 12,
      textAlign: "center",
      marginBottom: 10,
      color: fontColor,
    },
    headerContainer: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      width: "100%",
    },
    subHeaderContainer: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "flex-end",
      alignItems: "center",
      gap: "20px",
      width: "100%",
      padding: 10,
    },
    text: {
      margin: 12,
      fontSize: 14,
      color: fontColor,
    },
    image: {
      width: "110px",
      height: "40px",
    },
    header: {
      fontSize: 12,
      marginBottom: 20,
      textAlign: "center",
      color: "grey",
    },
    pageNumber: {
      position: "absolute",
      fontSize: 12,
      bottom: 30,
      left: 0,
      right: 0,
      textAlign: "center",
      color: "grey",
    },
    table: {
      width: "auto",
      borderStyle: "solid",
      borderColor: fontColor,
      backgroundColor: fontColor,
      borderWidth: 1,
      borderRightWidth: 0,
      borderBottomWidth: 0,
    },
    tableRow: {
      margin: "auto",
      flexDirection: "row",
      fontSize: 7,
    },
    tableCol: {
      width: "12.5%",
      borderStyle: "solid",
      borderWidth: 1,
      borderLeftWidth: 0,
      borderTopWidth: 0,
    },
    tableCell: {
      margin: "auto",
      padding: 3,
      fontSize: 10,
    },
    backImage: {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      zIndex: -1,
    },
  });

  if (!plan || !customer) return <Loading />;

  // Function to split array into chunks
  const chunkArray = (arr: any[], size: number) => {
    const result = [];
    for (let i = 0; i < arr.length; i += size) {
      result.push(arr.slice(i, i + size));
    }
    return result;
  };

  // Split structures into chunks of 24 rows per chunk
  const chunkedStructures = chunkArray(
    plan.structures,
    totalCheck && afterDiscount ? 24 : 23
  );

  const formatAddress = (address: any) => {
    // Replace English parentheses with Persian ones
    let persianAddress = address.replace(/[()]/g, (match: any) =>
      match === "(" ? ")" : "("
    );

    persianAddress = persianAddress.replace(/\d+/g, (digitSequence: any) =>
      digitSequence.split("").reverse().join("")
    );

    // Wrap the address in RLM for RTL direction
    return persianAddress;
  };

  return (
    <Document title={`proposal-${plan.planId.toString()}`}>
      <Page
        size={{ width: 720, height: 1280 }}
        style={[styles.body, { padding: 0 }]}
        orientation="landscape"
      >
        <Image src="/images/OHH.png" style={styles.backImage} />
      </Page>
      <Page
        size={{ width: 720, height: 1280 }}
        style={[styles.body, { padding: 0 }]}
        orientation="landscape"
      >
        <Image src="/images/Billboard.png" style={styles.backImage} />
      </Page>
      <Page
        size={{ width: 720, height: 1280 }}
        style={[styles.body, { padding: 0 }]}
        orientation="landscape"
      >
        <Image src="/images/about.png" style={styles.backImage} />
      </Page>
      {chunkedStructures.map((chunk, chunkIndex) => (
        <Page
          key={chunkIndex}
          size={{ width: 720, height: 1280 }}
          style={[styles.body, { padding: 0 }]}
          orientation="landscape"
        >
          <View
            style={{
              position: "relative",
              width: "100%",
              height: "100%",
            }}
          >
            <Image src="/images/Back-Black.png" style={styles.backImage} />
            <View
              style={{
                position: "absolute",
                top: 0,
                right: 0,
                paddingHorizontal: 55,
                paddingVertical: 40,
              }}
            >
              <View style={styles.headerContainer}>
                <Image src="/images/logo-En-V1.png" style={styles.image} />
                <Text style={styles.subtitle}>
                  {moment(Date.now()).format("jYYYY/jM/jD")}تاریخ :
                </Text>
              </View>

              <View style={styles.subHeaderContainer}>
                <Text style={styles.smallText} fixed>
                  {`نام برند: ${plan.brand} `}
                </Text>

                <Text style={styles.smallText} fixed>
                  {`نام مشتری: ${customer.name} `}
                </Text>
              </View>

              <View style={styles.table}>
                <View style={styles.tableRow}>
                  {columnsHeader.map((heading, colIndex) => (
                    <View
                      style={[
                        styles.tableCol,
                        {
                          width: heading.width,
                          backgroundColor: "black",
                          borderColor: fontColor,
                        },
                      ]}
                      key={colIndex}
                    >
                      <Text
                        style={[
                          styles.tableCell,
                          { color: fontColor, fontSize: 11 },
                        ]}
                      >
                        {heading.content}
                      </Text>
                    </View>
                  ))}
                </View>

                {chunk.map((structure: any, structureIndex: number) => (
                  <View style={styles.tableRow} key={structureIndex}>
                    {totalCheck && (
                      <View
                        style={[
                          styles.tableCol,
                          {
                            width: `${totalCheck ? "10%" : "0%"}`,
                          },
                        ]}
                      >
                        <Text style={styles.tableCell}>
                          {formatNumber(structure.totalPeriodCost, ",")}
                        </Text>
                      </View>
                    )}

                    {afterDiscount && (
                      <View
                        style={[
                          styles.tableCol,
                          {
                            width: `${
                              afterDiscount ? (totalCheck ? "8%" : "10%") : "0%"
                            }`,
                          },
                        ]}
                      >
                        <Text style={styles.tableCell}>
                          {formatNumber(structure.monthlyFeeWithDiscount, ",")}
                        </Text>
                      </View>
                    )}

                    <View
                      style={[
                        styles.tableCol,
                        {
                          width: `${
                            totalCheck && afterDiscount
                              ? "8%"
                              : totalCheck || afterDiscount
                              ? "9%"
                              : "10%"
                          }`,
                        },
                      ]}
                    >
                      <Text style={styles.tableCell}>
                        {formatNumber(structure.monthlyFee, ",")}
                      </Text>
                    </View>

                    <View
                      style={[
                        styles.tableCol,
                        {
                          width: `${
                            totalCheck && afterDiscount
                              ? "4%"
                              : totalCheck || afterDiscount
                              ? "5%"
                              : "6%"
                          }`,
                        },
                      ]}
                    >
                      <Text style={styles.tableCell}>
                        {structure.duration.diff}
                      </Text>
                    </View>

                    <View
                      style={[
                        styles.tableCol,
                        {
                          width: `${
                            totalCheck && afterDiscount
                              ? "7%"
                              : totalCheck || afterDiscount
                              ? "8%"
                              : "9%"
                          }`,
                        },
                      ]}
                    >
                      <Text style={styles.tableCell}>
                        {moment
                          .unix(structure.duration.sellEnd)
                          .format("jYYYY-jMM-jDD")}
                      </Text>
                    </View>

                    <View
                      style={[
                        styles.tableCol,
                        {
                          width: `${
                            totalCheck && afterDiscount
                              ? "7%"
                              : totalCheck || afterDiscount
                              ? "8%"
                              : "9%"
                          }`,
                        },
                      ]}
                    >
                      <Text style={styles.tableCell}>
                        {moment
                          .unix(structure.duration.sellStart)
                          .format("jYYYY-jMM-jDD")}
                      </Text>
                    </View>

                    <View
                      style={[
                        styles.tableCol,
                        {
                          width: `${
                            totalCheck && afterDiscount
                              ? "4%"
                              : totalCheck || afterDiscount
                              ? "5%"
                              : "6%"
                          }`,
                        },
                      ]}
                    >
                      <Text style={styles.tableCell}>
                        {structure.structureRecord.marks.markOptions.docSize}
                      </Text>
                    </View>

                    <View
                      style={[
                        styles.tableCol,
                        {
                          width: `${
                            totalCheck && afterDiscount
                              ? "6%"
                              : totalCheck || afterDiscount
                              ? "7%"
                              : "8%"
                          }`,
                        },
                      ]}
                    >
                      <Text style={styles.tableCell}>
                        {structure.structureRecord.marks.name}
                      </Text>
                    </View>

                    <View
                      style={[
                        styles.tableCol,
                        {
                          width: `${
                            totalCheck && afterDiscount
                              ? "32%"
                              : totalCheck || afterDiscount
                              ? "33%"
                              : "34%"
                          }`,
                        },
                      ]}
                    >
                      <Text style={styles.tableCell}>
                        {formatAddress(
                          structure.structureRecord.location.address
                        )}
                      </Text>
                    </View>

                    <View
                      style={[
                        styles.tableCol,
                        {
                          width: `${
                            totalCheck && afterDiscount
                              ? "6%"
                              : totalCheck || afterDiscount
                              ? "7%"
                              : "8%"
                          }`,
                        },
                      ]}
                    >
                      <Text style={styles.tableCell}>
                        {formatAddress(structure.structureRecord.location.path)}
                      </Text>
                    </View>

                    <View
                      style={[
                        styles.tableCol,
                        {
                          width: `${
                            totalCheck && afterDiscount
                              ? "5%"
                              : totalCheck || afterDiscount
                              ? "5%"
                              : "7%"
                          }`,
                        },
                      ]}
                    >
                      <Text style={styles.tableCell}>
                        {structure.structureRecord.name}
                      </Text>
                    </View>

                    <View style={[styles.tableCol, { width: "3%" }]}>
                      <Text style={styles.tableCell}>
                        {chunkIndex * (totalCheck && afterDiscount ? 24 : 23) +
                          structureIndex +
                          1}
                      </Text>
                    </View>
                  </View>
                ))}

                {/* Footer row for totals */}
                {totalCheck && chunkIndex === chunkedStructures.length - 1 && (
                  <View style={styles.tableRow}>
                    <View style={[styles.tableCol, { width: "10%" }]}>
                      <Text style={styles.tableCell}>
                        {formatNumber(
                          plan.structures.reduce(
                            (sum: number, structure: any) =>
                              sum + structure.totalPeriodCost,
                            0
                          ),
                          ","
                        )}
                      </Text>
                    </View>

                    <View style={[styles.tableCol, { width: "92%" }]}>
                      <Text style={styles.tableCell}>جمع</Text>
                    </View>
                  </View>
                )}
              </View>
            </View>
          </View>

          <Text
            style={styles.pageNumber}
            render={({ pageNumber, totalPages }) =>
              `${pageNumber} / ${totalPages}`
            }
            fixed
          />
        </Page>
      ))}
      <Page
        size={{ width: 720, height: 1280 }}
        style={{ padding: 0 }}
        orientation="landscape"
      >
        {plan.structures.map((strucuture: any, structureIndex: number) => {
          return (
            <View
              style={{
                position: "relative",
                width: "100%",
                height: "100%",
              }}
            >
              <Image
                src={`/png/${
                  strucuture.structureRecord.name.startsWith("B")
                    ? strucuture.structureRecord.name
                    : strucuture.structureRecord.name.slice(1)
                }.png`}
                style={styles.backImage}
              />
              <View
                style={{
                  position: "absolute",
                  bottom: 127,
                  right: 44,
                }}
              >
                <Text
                  style={{
                    fontFamily: "Arial",
                    color: "white",
                    fontSize: 20,
                    fontWeight: "bold",
                  }}
                >
                  {formatNumber(strucuture.monthlyFee, ",")}
                </Text>
              </View>
            </View>
          );
        })}
        <Text
          style={styles.pageNumber}
          render={({ pageNumber, totalPages }) =>
            `${pageNumber} / ${totalPages}`
          }
          fixed
        />
      </Page>
      <Page
        size={{ width: 720, height: 1280 }}
        style={[styles.body, { padding: 0 }]}
        orientation="landscape"
      >
        <Image src="/images/contact.png" style={styles.backImage} />
      </Page>
      <Page
        size={{ width: 720, height: 1280 }}
        style={[styles.body, { padding: 0 }]}
        orientation="landscape"
      >
        <View
          style={{
            position: "relative",
            width: "100%",
            height: "100%",
          }}
        >
          <Image src="/images/Back-Black.png" style={styles.backImage} />
          <Image src="/images/last-page.png" />
        </View>
      </Page>
    </Document>
  );
};

export default PlanPdfDoc;
