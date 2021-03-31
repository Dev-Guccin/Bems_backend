const ExcelJS = require('exceljs')
const DBH  = require('./database.js')

const filePath = './uploads/latestExcel.xlsx'

var Device={
	ChannelName:'',
	ComType:'',
	IpAddress:'',
	Port:'',
	Period:'',
	WaitTime:'',
	Active:''
}
var Excel = {
    loadExcelFile: async function(filepath){
        const sheetData = [] 
 
        const workbook = new ExcelJS.Workbook() // 엑셀의 객체
        await workbook.xlsx.readFile(filePath)
        for (let index = 0; index < 1; index++) {
            const worksheet = workbook.worksheets[index] // 첫 번째 sheet 선택
            const options = { includeEmpty: true }
            // worksheet에 접근하여 데이터를 읽어옴
            await worksheet.eachRow(options, (row, rowNum) => {
                sheetData[rowNum] = []
                row.eachCell(options, (cell, cellNum) => {
                    sheetData[rowNum][cellNum] = { value:cell.value, style:cell.style }
                })
            })
            for (let i = 2; i < sheetData.length; i++) {
                Device.ChannelName	=sheetData[i][1].value
                Device.ComType		=sheetData[i][2].value
                Device.IpAddress	=sheetData[i][3].value
                Device.Port			=sheetData[i][4].value
                Device.Period		=sheetData[i][5].value
                Device.WaitTime		=sheetData[i][6].value
                Device.Active		=sheetData[i][7].value
                console.log(Device)
            }
        }
    }
}
module.exports = Excel