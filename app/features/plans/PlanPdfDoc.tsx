import { Document, Page, StyleSheet, Font, Text, Image, View } from '@react-pdf/renderer'
import Loading from '../loading/Loading'
import moment from 'jalali-moment'
import useNumberFormatter from '@/app/hooks/useNumberFormatter'

const PlanPdfDoc = (props: any) => {

  const { plan, customer } = props

  Font.register({
      family: 'sahel',
      fonts: [
        {
          src: '/fonts/Sahel-FD.ttf',
          fontWeight: 400
        }
      ]
  })

  const columnsHeader = [
    { content: 'جمع دوره', width: "7%" },
    { content: 'پس از تخفیف', width: "7%" },
    { content: 'تخفیف', width: "7%" },
    { content: 'تعرفه ماهیانه', width: '7%'},
    { content: 'اکران', width: '3%'},
    { content: 'تاریخ پایان', width: '7%'},
    { content: 'تاریخ شروع', width: '7%'},
    { content: "مساحت", width: "3%" },
    { content: "نوع سازه", width: "7%" },
    { content: "نشانی", width: "30%" },
    { content: "مسیر", width: "8%" },
    { content: "سامانه", width: "5%" },
    { content: "ردیف", width: "2%" },
  ]

  const styles = StyleSheet.create({
    body: {
      padding: 35,
      fontFamily: 'sahel',
    },
    title: {
      fontSize: 24,
      textAlign: 'center',
    },
    subtitle: {
      fontSize: 14,
      margin: 12,
      textAlign: 'center',
    },
    smallText: {
      fontSize: 12,
      textAlign: 'center',
      marginBottom: 10
    },
    headerContainer: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center', 
      width: '100%'
    }, 
    subHeaderContainer: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignItems: 'center', 
      gap: '20px',
      width: '100%'
    }, 
    text: {
      margin: 12,
      fontSize: 14,
    },
    image: {
      width: '50px',
      height: '50px',
    },
    header: {
      fontSize: 12,
      marginBottom: 20,
      textAlign: 'center',
      color: 'grey',
    },
    pageNumber: {
      position: 'absolute',
      fontSize: 12,
      bottom: 30,
      left: 0,
      right: 0,
      textAlign: 'center',
      color: 'grey',
    },
    table: { 
      width: "auto", 
      borderStyle: "solid",
      borderWidth: 1, 
      borderRightWidth: 0, 
      borderBottomWidth: 0 
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
      borderTopWidth: 0 
    }, 
    tableCell: { 
      margin: "auto", 
      marginTop: 5, 
      fontSize: 7 
    }
  })

  if(!plan || !customer) return <Loading />

  return (
    <Document>
      <Page style={styles.body} orientation='landscape'>
        <View style={styles.headerContainer}>
          <Text style={styles.subtitle}>{moment(Date.now()).format('jYYYY/jM/jD')}تاریخ : </Text>
          <Text style={styles.title}>پلن پیشنهادی</Text>
          <Image src='/images/Logo.png' style={styles.image}/>
        </View>
        {plan && (
          <>
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
                  <View style={[styles.tableCol, { width: heading.width }]} key={colIndex}> 
                    <Text style={styles.tableCell}>{heading.content}</Text> 
                  </View> 
                ))}
              </View>

              {plan.structures.map((strucuture: any, structureIndex: number) => {
                return(
                    <View style={styles.tableRow} key={structureIndex}>
                      <View style={[styles.tableCol, { width: '7%' }]}>
                        <Text style={styles.tableCell}>
                          {useNumberFormatter(strucuture.totalPeriodCost, ',')}
                        </Text>
                      </View>
                      <View style={[styles.tableCol, { width: '7%' }]}>
                        <Text style={styles.tableCell}>
                          {useNumberFormatter(strucuture.monthlyFeeWithDiscount, ',')}
                        </Text>
                      </View>
                      <View style={[styles.tableCol, { width: '7%' }]}>
                        <Text style={styles.tableCell}>
                          {`${strucuture.discountFee} ${strucuture.discountType === 'percentage'? "درصد" : "ریال"}`}
                        </Text>
                      </View>
                      <View style={[styles.tableCol, { width: '7%' }]}>
                        <Text style={styles.tableCell}>
                          {useNumberFormatter(strucuture.monthlyFee, ',')}
                        </Text>
                      </View>
                      <View style={[styles.tableCol, { width: '3%' }]}>
                        <Text style={styles.tableCell}>
                          {strucuture.duration.diff}
                        </Text>
                      </View>
                      <View style={[styles.tableCol, { width: '7%' }]}>
                        <Text style={styles.tableCell}>
                          {strucuture.duration.sellEnd}
                        </Text>
                      </View>
                      <View style={[styles.tableCol, { width: '7%' }]}>
                        <Text style={styles.tableCell}>
                          {strucuture.duration.sellStart}
                        </Text>
                      </View>
                      <View style={[styles.tableCol, { width: '3%' }]}>
                        <Text style={styles.tableCell}>
                          {strucuture.structureRecord.marks.markOptions.docSize}
                        </Text>
                      </View>
                      <View style={[styles.tableCol, { width: '7%' }]}>
                        <Text style={styles.tableCell}>
                          {strucuture.structureRecord.marks.name}
                        </Text>
                      </View>
                      <View style={[styles.tableCol, { width: '30%' }]}>
                        <Text style={styles.tableCell}>
                          {strucuture.structureRecord.location.address}
                        </Text>
                      </View>
                      <View style={[styles.tableCol, { width: '8%' }]}>
                        <Text style={styles.tableCell}>
                          {strucuture.structureRecord.location.path}
                        </Text>
                      </View>
                      <View style={[styles.tableCol, { width: '5%' }]}>
                        <Text style={styles.tableCell}>
                          {strucuture.structureRecord.name}
                        </Text>
                      </View>
                      <View style={[styles.tableCol, { width: '2%' }]}>
                        <Text style={styles.tableCell}>
                          {structureIndex + 1}
                        </Text>
                      </View>
                    </View >
                )
              })}

                  <View style={styles.tableRow}>
                    <View style={[styles.tableCol, { width: '7%' }]}>
                      <Text style={styles.tableCell}>
                        {useNumberFormatter(plan.structures.reduce((sum: number, structure: any) => sum + structure.totalPeriodCost , 0), ',')}
                      </Text> 
                    </View>
                    <View style={[styles.tableCol, { width: '93%' }]}>
                      <Text style={styles.tableCell}>جمع</Text> 
                    </View>
                  </View>

              {/* <View style={styles.tableRow}>
                <View style={[styles.tableCol, { width: '10%' }]}>
                  <Text style={styles.tableCell}>10101010</Text> 
                </View>
                <View style={[styles.tableCol, { width: '90%' }]}>
                  <Text style={styles.tableCell}>جمع</Text> 
                </View>
              </View> */}

            </View>
          </>
        )}
        <Text style={styles.pageNumber} render={({ pageNumber, totalPages }) => (
        `${pageNumber} / ${totalPages}`
      )} fixed />
      </Page>
    </Document>
  )
}

export default PlanPdfDoc