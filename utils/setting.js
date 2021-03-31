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
var Frame={
	ChannelName:'',
	FrameName:'',
	FunctionCode :'',
	DeviceAddress :'',
	StartAddress :'',
	ReadByte :'',
	Active:''
}
var Excel = {
    loadExcelFile: async function(filepath){
        const sheetData = [] 
 
        const workbook = new ExcelJS.Workbook() // 엑셀의 객체
        await workbook.xlsx.readFile(filePath)
        for (let page = 0; page < 2; page++) {
            const worksheet = workbook.worksheets[page] // 첫 번째 sheet 선택
            const options = { includeEmpty: true }
            // worksheet에 접근하여 데이터를 읽어옴
            await worksheet.eachRow(options, (row, rowNum) => {
                sheetData[rowNum] = []
                row.eachCell(options, (cell, cellNum) => {
                    sheetData[rowNum][cellNum] = { value:cell.value, style:cell.style }
                })
            })
            if( page == 0){ // Device 페이지
                DBH.device_delete('devices')// DB깔끔하게 밀어버리기
                for (let i = 2; i < sheetData.length; i++) {
                    Device.ChannelName	=sheetData[i][1].value
                    Device.ComType		=sheetData[i][2].value
                    Device.IpAddress	=sheetData[i][3].value
                    Device.Port			=sheetData[i][4].value
                    Device.Period		=sheetData[i][5].value
                    Device.WaitTime		=sheetData[i][6].value
                    Device.Active		=sheetData[i][7].value
                    console.log(Device)
                    // 이걸 DB에 저장해야함
                    DBH.device_insert(page, Device)
                }
            }
            else if(page ==1){//Frame 페이지
                DBH.device_delete('frames')// DB깔끔하게 밀어버리기
                for (let i = 2; i < sheetData.length; i++) {
                    Frame.ChannelName	=sheetData[i][1].value
                    Frame.FrameName		=sheetData[i][2].value
                    Frame.FunctionCode	=sheetData[i][3].value
                    Frame.DeviceAddress	=sheetData[i][4].value
                    Frame.StartAddress	=sheetData[i][5].value
                    Frame.ReadByte		=sheetData[i][6].value
                    Frame.Active		=sheetData[i][7].value
                    console.log(Frame)
                    // 이걸 DB에 저장해야함
                    DBH.device_insert(page, Frame)
                }
            }
            else{//Detail 페이지
                DBH.device_delete('details')// DB깔끔하게 밀어버리기

            }
        }
    }
}
module.exports = Excel