import {
  Document,
  Page,
  StyleSheet,
  Font,
  Text,
  Image,
  View,
} from "@react-pdf/renderer";
import { formatNumber } from "@/app/utilities/formatNumber";
import moment from "jalali-moment";
import Loading from "../../loading/Loading";

const AvailableStructuresPdf = (structures: any) => {
  Font.register({
    family: "sahel",
    fonts: [
      {
        src: "/fonts/Sahel-FD.ttf",
        fontWeight: 400,
      },
    ],
  });
  const columnsHeader = [
    { content: "تا تاریخ", width: "16%" },
    { content: "از تاریخ", width: "16%" },
    { content: "نشانی", width: "41%" },
    { content: "مسیر", width: "16%" },
    { content: "کد سازه", width: "7%" },
    { content: "ردیف", width: "4%" },
  ];

  const grey = "lightgrey";

  const styles = StyleSheet.create({
    body: {
      paddingHorizontal: 80,
      paddingTop: 35,
      fontFamily: "sahel",
      paddingBottom: 52,
    },
    title: {
      fontSize: 24,
      textAlign: "center",
    },
    subtitle: {
      fontSize: 14,
      marginHorizontal: 12,
      textAlign: "center",
    },
    smallText: {
      fontSize: 12,
      textAlign: "center",
      marginBottom: 10,
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
      justifyContent: "flex-start",
      alignItems: "center",
      gap: "20px",
      width: "100%",
    },
    text: {
      margin: 12,
      fontSize: 14,
    },
    image: {
      width: "35px",
      height: "35px",
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
      marginTop: 3,
      borderStyle: undefined,
      borderWidth: 0,
      borderBottomWidth: 1,
      borderBottomColor: grey,
    },
    tableRow: {
      margin: "auto",
      flexDirection: "row",
      fontSize: 7,
      borderBottomWidth: 1,
      borderBottomColor: grey,
    },
    tableCol: {
      width: "12.5%",
      borderStyle: undefined,
      borderWidth: 1,
      borderColor: grey,
    },
    tableCell: {
      margin: "auto",
      marginTop: 5,
      fontSize: 9,
      borderLeftWidth: 0,
      borderTopWidth: 0,
    },
    contentCell: {
      marginTop: 5,
      marginBottom: 1,
      padding: 2,
      fontSize: 9,
      borderLeftWidth: 0,
      borderTopWidth: 0,
      display: "flex",
      flexDirection: "row-reverse",
      borderStyle: undefined,
      borderBottomWidth: 1,
      borderBottomColor: grey,
      minWidth: "25vw",
    },
  });

  if (!structures) return <Loading />;

  return (
    <Document>
      <Page size="A4" style={styles.body} orientation="landscape">
        <View style={styles.headerContainer}>
          <Text style={styles.subtitle}>
            {moment(Date.now()).format("jYYYY/jM/jD")}تاریخ :
          </Text>

          <Text style={styles.title}>سازه های خالی</Text>

          <Image src="/images/Logo.png" style={styles.image} />
        </View>

        {structures && (
          <>
            {/* <View style={styles.subHeaderContainer}>
              <Text style={styles.smallText} fixed>
                {`نام برند: ${plan.brand} `}
              </Text>

              <Text style={styles.smallText} fixed>
                {`نام مشتری: ${customer.name} `}
              </Text>
            </View> */}

            <View style={styles.table}>
              <View style={[styles.tableRow, { backgroundColor: "purple" }]}>
                {columnsHeader.map((heading, colIndex) => (
                  <View
                    style={[
                      styles.tableCol,
                      { width: heading.width, color: "white" },
                    ]}
                    key={colIndex}
                  >
                    <Text style={styles.tableCell}>{heading.content}</Text>
                  </View>
                ))}
              </View>

              {structures.structures.availableStructures.map(
                ([key, value]: any, structureIndex: number) => {
                  return (
                    <View
                      style={[
                        styles.tableRow,
                        value.location.color === "red"
                          ? { backgroundColor: "#ffedd5" }
                          : { backgroundColor: "white" },
                      ]}
                      key={structureIndex}
                    >
                      <View style={[styles.tableCol, { width: "16%" }]}>
                        {value.availableRanges.map(
                          (dateRange: any, index: number, ref: any) => (
                            <Text style={styles.tableCell}>
                              {index === 0 ? (
                                <>
                                  {moment.unix(dateRange.endDate).jDate() ===
                                  moment.unix(dateRange.endDate).jDaysInMonth()
                                    ? moment
                                        .unix(dateRange.endDate)
                                        .format("jYYYY-jMM-jDD")
                                    : moment
                                        .unix(dateRange.endDate)
                                        .subtract(1, "d")
                                        .format("jYYYY-jMM-jDD")}
                                </>
                              ) : (
                                <>
                                  {index !== ref.length - 1 ? (
                                    <>
                                      {moment
                                        .unix(dateRange.endDate)
                                        .subtract(1, "d")
                                        .format("jYYYY-jMM-jDD")}
                                    </>
                                  ) : (
                                    <>
                                      {moment
                                        .unix(dateRange.endDate)
                                        .format("jYYYY-jMM-jDD")}
                                    </>
                                  )}
                                </>
                              )}
                            </Text>
                          )
                        )}
                      </View>

                      <View style={[styles.tableCol, { width: "16%" }]}>
                        {value.availableRanges.map(
                          (dateRange: any, index: number, ref: any) => (
                            <Text style={styles.tableCell}>
                              {index === 0 ? (
                                <>
                                  {moment.unix(dateRange.startDate).jDate() !==
                                  1
                                    ? moment
                                        .unix(dateRange.startDate)
                                        .add(1, "d")
                                        .format("jYYYY-jMM-jDD")
                                    : moment
                                        .unix(dateRange.startDate)
                                        .format("jYYYY-jMM-jDD")}
                                </>
                              ) : (
                                <>
                                  {moment
                                    .unix(dateRange.startDate)
                                    .add(1, "d")
                                    .format("jYYYY-jMM-jDD")}
                                </>
                              )}
                            </Text>
                          )
                        )}
                      </View>

                      <View style={[styles.tableCol, { width: "41%" }]}>
                        <Text style={styles.tableCell}>
                          {value.location.address}
                        </Text>
                      </View>

                      <View style={[styles.tableCol, { width: "16%" }]}>
                        <Text style={styles.tableCell}>
                          {value.location.path}
                        </Text>
                      </View>

                      <View style={[styles.tableCol, { width: "7%" }]}>
                        <Text style={styles.tableCell}>{key}</Text>
                      </View>

                      <View style={[styles.tableCol, { width: "4%" }]}>
                        <Text style={styles.tableCell}>
                          {structureIndex + 1}
                        </Text>
                      </View>
                    </View>
                  );
                }
              )}
            </View>
          </>
        )}
        <Text
          style={styles.pageNumber}
          render={({ pageNumber, totalPages }) =>
            `${pageNumber} / ${totalPages}`
          }
          fixed
        />
      </Page>
    </Document>
  );
};

export default AvailableStructuresPdf;
