const moment = require("moment");
const S3 = require("react-aws-s3");
// import S3 from 'react-aws-s3';
const { REACT_APP_AWS_AccessKeyId,REACT_APP_AWS_SecretAccessKey } = process.env;

exports.FormatDate = (date) => {
  let myDate = moment(date);
  return myDate.format("D MMM, YYYY")
}

exports.GetCurrent = () => {
  let currentDate = moment(new Date());
  var currentDay = currentDate.format('D');
  var currentMonthInNumber = currentDate.format('M');
  var currentMonth = currentDate.format('MMM');
  var currentYear = currentDate.format('YYYY');
  return { currentDay, currentMonthInNumber, currentMonth, currentYear }
}

exports.GetMonth = (month, year) => {
  let myDate = moment(month+','+year,'MMM,YYYY');
  let format = {startDay:myDate.startOf('month').format('d'),endDate:myDate.endOf('month').format('D')}
  return format;
 
}

exports.UploadFile = (file,dir) => {
  const config = {
    bucketName: 'deeplearningsystem',
    dirName: dir || 'books', /* optional */
    region: 'us-east-2',
    accessKeyId: REACT_APP_AWS_AccessKeyId,
    secretAccessKey: REACT_APP_AWS_SecretAccessKey,
    // accessKeyId: 'AKIA4AGP3DFNUTNBWP5R',
    // secretAccessKey: 'ftb5fzVCm3cxJ6IPZTgJ27W1gP3aLqWSW3Uy2Udb',
    // s3Url: 'https:/your-custom-s3-url.com/', /* optional */
  }
  const ReactS3Client = new S3(config);
  const filename = Date.now() + file.name;

  return new Promise((resolve, reject) => {
    return (
      ReactS3Client
        .uploadFile(file, filename)
        .then((res) => {
          return resolve(res.location);
        })
        .catch((error) => {
          return reject("Something went Wrong!");
        })
    );
  });

};