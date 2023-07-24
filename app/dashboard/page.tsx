"use client"
import UnderConstruction from '../components/main/UnderConstruction'
import PageTitle from '../components/main/PageTitle'
import { usePDF, Document, Page, View, Text, Image, PDFViewer, StyleSheet, Font } from '@react-pdf/renderer'
import Loading from '../features/loading/Loading';
import Link from 'next/link';

const MyDoc = (
  <Document>
    <Page>
      // My document data
    </Page>
  </Document>
);

const Dashboard = () => {
  const [instance, updateInstance] = usePDF({ document: MyDoc });

  if (instance.loading) return <Loading/>

  if (instance.error) return <div>Something went wrong</div>

  return (
    <main className="min-h-screen">
      <PageTitle name={'داشبورد'} />
      <div className="w-full">
        <UnderConstruction 
          desc='در این داشبورد تمامی چارت ها و گزارشات آماری بر اساس اطلاعات موجود در پلتفرم نمایش داده خواهد شد.'
        />
      </div>
      <Link href={instance.url!} download="test.pdf">
      Download
    </Link>
    </main>
  )
}

export default Dashboard 