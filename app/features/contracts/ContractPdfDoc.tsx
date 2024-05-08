import {
  Document,
  Page,
  StyleSheet,
  Font,
  Text,
  Image,
  View,
} from "@react-pdf/renderer";
import {
  FinalCustomerObject,
  InitialCustomerObject,
  PlanObject,
} from "@/app/lib/interfaces";
import { formatNumber } from "@/app/utilities/formatNumber";
import Loading from "../loading/Loading";
import moment from "jalali-moment";

type Props = {
  plan: PlanObject;
  customer: InitialCustomerObject;
  code: string;
  finalCustomer: FinalCustomerObject | undefined;
};

const ContractPdfDoc = (props: Props) => {
  const { plan, customer, code, finalCustomer } = props;

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
    { content: "جمع", width: "20%" },
    { content: "مدت", width: "16%" },
    { content: "تعداد رسانه ", width: "16%" },
    { content: "تاریخ پایان", width: "16%" },
    { content: "تاریخ شروع", width: "16%" },
    { content: "برند", width: "16%" },
  ];
  const grey = "lightgrey";

  const numberSell = plan.structures.map((x: any) => x.duration.sellStart);
  const startedAt = Math.min(...numberSell);
  const number = plan.structures.map((x: any) => x.duration.sellEnd);
  const finishedAt: any = Math.max(...number);

  const startDate = new Date(startedAt * 1000); // Convert Unix timestamp to milliseconds
  const endDate = new Date(finishedAt * 1000); // Convert Unix timestamp to milliseconds
  const differenceInTime = endDate.getTime() - startDate.getTime();
  const differenceInDays = Math.ceil(differenceInTime / (1000 * 3600 * 24));

  const styles = StyleSheet.create({
    body: {
      paddingHorizontal: 80,
      paddingVertical: 35,
      fontFamily: "sahel",
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
      width: "50px",
      height: "50px",
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
    },
    tableCol: {
      width: "12.5%",
      borderStyle: undefined,
      borderWidth: undefined,
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

  if (!plan || !customer) return <Loading />;
  return (
    <Document>
      <Page size="A4" style={styles.body} orientation="landscape">
        <Text style={styles.title}>شناسه اجاره بیلبورد</Text>
        <View style={styles.headerContainer}>
          <div className="flex flex-col justify-center align-center">
            <Image src="/images/Logo.png" style={styles.image} />
            <Text style={styles.subtitle}>
              {moment(Date.now()).format("jYYYY/jM/jD")}تاریخ :
            </Text>
          </div>

          <div className="flex flex-col justify-center align-center">
            <Text style={styles.subtitle}>{code}شماره :</Text>
            <Text style={styles.subtitle}>
              {`نام مشتری: ${customer.name} `}
            </Text>
          </div>
        </View>

        {plan && (
          <>
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

              <View style={styles.tableRow}>
                <View style={[styles.tableCol, { width: "20%" }]}>
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

                <View style={[styles.tableCol, { width: "16%" }]}>
                  <Text style={styles.tableCell}>{differenceInDays}</Text>
                </View>

                <View style={[styles.tableCol, { width: "16%" }]}>
                  <Text style={styles.tableCell}>{plan.structures.length}</Text>
                </View>

                <View style={[styles.tableCol, { width: "16%" }]}>
                  <Text style={styles.tableCell}>
                    {moment.unix(finishedAt).format("jYYYY-jM-jD")}
                  </Text>
                </View>

                <View style={[styles.tableCol, { width: "16%" }]}>
                  <Text style={styles.tableCell}>
                    {moment.unix(startedAt).format("jYYYY-jM-jD")}
                  </Text>
                </View>

                <View style={[styles.tableCol, { width: "16%" }]}>
                  <Text style={styles.tableCell}>{plan.brand}</Text>
                </View>
              </View>
            </View>
            <View
              style={{
                marginTop: 30,
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <View
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                <View>
                  <View style={styles.contentCell}>
                    <Text>
                      {finalCustomer?.ecoCode
                        ? finalCustomer.ecoCode
                        : finalCustomer?.nationalId}
                      کداقتصادی :{" "}
                    </Text>
                  </View>
                  <View style={styles.contentCell}>
                    <Text>
                      {finalCustomer?.regNum}
                      شماره ثبت :{" "}
                    </Text>
                  </View>
                  <View style={styles.contentCell}>
                    <Text>
                      {finalCustomer?.nationalId}
                      شناسه ملی :{" "}
                    </Text>
                  </View>
                  <View style={styles.contentCell}>
                    <Text>
                      {finalCustomer?.phone}
                      تلفن :{" "}
                    </Text>
                  </View>
                </View>
                <View
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    height: "20vh",
                    width: "30vh",
                    margin: 2,
                    padding: 3,
                  }}
                >
                  <View
                    style={[
                      styles.contentCell,
                      {
                        borderBottom: 0,
                        justifyContent: "space-evenly",
                      },
                    ]}
                  >
                    <Text>امضا-مدیر پروژه</Text>
                    <Text>امضا-مدیر رسانه</Text>
                  </View>
                  <View
                    style={[
                      styles.contentCell,
                      {
                        borderBottom: 0,
                        justifyContent: "space-evenly",
                      },
                    ]}
                  >
                    <Text>امضا-امورقراردادها</Text>
                    <Text>امضا-مدیریت</Text>
                  </View>
                </View>
              </View>
              <View>
                <View style={styles.contentCell}>
                  <Text>
                    {finalCustomer?.contractType === "official"
                      ? "رسمی"
                      : "غیر رسمی"}
                    نوع قرارداد :{" "}
                  </Text>
                </View>
                <View style={styles.contentCell}>
                  <Text>
                    {finalCustomer?.agent[0].agentName}
                    نام مدير/نماينده :
                  </Text>
                </View>
                <View style={styles.contentCell}>
                  <Text>اسم شرکت : ---</Text>
                </View>
                <View style={styles.contentCell}>
                  <Text>
                    {finalCustomer?.agent[0].post}
                    سمت :{" "}
                  </Text>
                </View>
                <View style={styles.contentCell}>
                  <Text>
                    {finalCustomer?.address}
                    آدرس :
                  </Text>
                </View>
                <View style={styles.contentCell}>
                  <Text>
                    {finalCustomer?.postalCode}
                    کدپستی :{" "}
                  </Text>
                </View>
                <View style={styles.contentCell}>
                  <Text>توضیحات : ---</Text>
                </View>
                <View style={styles.contentCell}>
                  <Text>نحوه پرداخت : ---</Text>
                </View>
                <View style={styles.contentCell}>
                  <Text>نام و نوع قرارداد بازاریاب : ---</Text>
                </View>
                <View style={styles.contentCell}>
                  <Text>درصد/مبلغ بازاریاب : ---</Text>
                </View>
                <View style={styles.contentCell}>
                  <Text>مدت زمان رایگان : ---</Text>
                </View>
              </View>
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

export default ContractPdfDoc;
