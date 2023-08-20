"use client"
import React, { useEffect, useRef } from 'react'
import Chart, { ChartConfiguration } from 'chart.js/auto'

type Props = {
  mode: string | undefined
  type: string
  title: string
  displayTitle: boolean
  data: any[]
  labels: any[]
  label: string
  darkColor?: string
  lightColor?: string
  borderWidth?: number
  bgColors?: string[]
}

const LineChart = (props: Props) => {

  const { mode, type, title, displayTitle, data, labels, label, darkColor, lightColor, borderWidth, bgColors } = props

  const chartContainer = useRef<HTMLCanvasElement>(null)

    useEffect(() => {
        if (chartContainer.current) {
            const ctx = chartContainer.current.getContext('2d')
            if (ctx) {
              const chartConfig: ChartConfiguration<any> = {
                type: type,
                data: {
                  labels: labels,
                  datasets: [
                    {
                      label: label,
                      data: data,
                      borderColor: mode === 'dark' ? darkColor : lightColor,
                      backgroundColor: type !== 'pie'? mode === 'dark' ? darkColor : lightColor : bgColors,
                      borderWidth: borderWidth,
                      fill: false
                    },
                  ]
                },
      
                options: {
                  responsive: true,
                  plugins: {
                    legend: {
                      labels: {
                        color: mode === 'dark' ? '#c7c5c6' : '#434445',
                        font: {
                          size: 20,
                        }
                      }
                    },
                    title: {
                        display: displayTitle,
                        color: mode === 'dark' ? '#c7c5c6' : '#434445',
                        text: title,
                        font: {
                          size: 22
                        }
                      }
                  },
                  scales: {
                    x: {
                      beginAtZero: true,
                      grid: {
                        color: mode === 'dark' ? '#c7c5c6' : '#434445',
                      },
                      ticks: {
                        color: mode === 'dark' ? '#c7c5c6' : '#434445',
                      },
                    },
                    y: {
                      beginAtZero: true,
                      grid: {
                        color:  mode === 'dark' ? '#c7c5c6' : 'black',
                      },
                      ticks: {
                        color: mode === 'dark' ? '#c7c5c6' : '#434445',
                      },
                    },
                  }
                }
            }
            const myLineChart = new Chart(ctx, chartConfig)
            return () => myLineChart.destroy()
        }
    }
    },[mode])

  return <canvas className="w-full h-full " ref={chartContainer} />
}

export default LineChart