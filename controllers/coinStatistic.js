const request = require('request');
const DB = require('./DB')

exports.getCoinStatisticData = function (req,res) {
 let   coins = DB.listAlgoritm
 let promise = []
 let coin = coins.find(item => item.port == req.params.id)
 promise[0] = new Promise(function(resolve, reject) {
     request(`http://p2p-ekb.xyz:${coin.port}/rate`, (err, response, rate) => {
       resolve({name:'rate',value:rate})
     })
 });
 promise[1] = new Promise(function(resolve, reject) {
     request(`http://p2p-ekb.xyz:${coin.port}/difficulty`, (err, response, difficulty) => {
       resolve({name:'difficulty',value:difficulty})
     })
 });
 promise[2] = new Promise(function(resolve, reject) {
     request(`http://p2p-ekb.xyz:${coin.port}/fee`, (err, response, fee) => {
       resolve({name:'fee',value:fee})
     })
 });
 promise[3] = new Promise(function(resolve, reject) {
     request(`http://p2p-ekb.xyz:${coin.port}/local_stats`, (err, response, local_stats) => {
       resolve({name:'local_stats',value:local_stats})
     })
 });
 promise[4] = new Promise(function(resolve, reject) {
   request('http://p2p-ekb.xyz:'+coin.port+'/users', (err, response, users) => {
    users = JSON.parse(users)
    let count  = 0;
    for (var i  in users) {
        count++
    }
     resolve({name:'users',value:count - 1 }) 
   })

 });
 // promise[5] = new Promise(function(resolve, reject) {
 //   request(`http://p2p-ekb.xyz:${coin.port}/web/graph_data/pool_rates/last_hour`, (err, response, graphic) => {
 //     resolve({name:'graphic',value:graphic})
 //   })
 //
 // });
 Promise.all(promise).then(function (result) {
   let coinStatisticData = {}
   for (var i = 0; i < result.length; i++) {
     coinStatisticData[result[i].name] = result[i].value
   }
   coinStatisticData.local_stats = JSON.parse(coinStatisticData.local_stats)
   // coinStatisticData.graphic = JSON.parse(coinStatisticData.graphic)
   coinStatisticData.port = coin.port
   coinStatisticData.fullName = coin.fullName
   coinStatisticData.algoritm = coin.algoritm
   coinStatisticData.name = coin.name
<<<<<<< HEAD
 //res.json(coinStatisticData)
  res.render('pool',{coinStatisticData})
=======
  res.json(coinStatisticData)
   // res.render('pool',{coinStatisticData})
>>>>>>> a9040cae9b53585aafeda7e56d5f38b2c44a7aa7
 })
}

exports.graphic = (req,res) => {
  period = ['last_hour','last_day','last_week','last_month','last_year']
  let coins = DB.listAlgoritm
  let coin = coins.find(item => item.port == req.params.id)
    request(`http://p2p-ekb.xyz:${coin.port}/web/graph_data/pool_rates/${period[req.params.idPeriod]}`, (err, response, graphic) => {
      graphic = JSON.parse(graphic)
      graphic.splice(0,1)
      for (var i = 0; i < graphic.length; i++) {
        if(graphic[i][1] == null){
            graphic[i][1] = {}
        }
        else if(graphic[i][1].good === undefined){
            graphic[i][1].good = 0
        }
        else if (graphic[i][1].doa === undefined) {
          graphic[i][1].doa = 0
        }
        else if (graphic[i][1].orphan === undefined) {
          graphic[i][1].orphan = 0
        }
        graphic[i][0]= graphic[i][0]*1000;
        graphic[i][1] = graphic[i][1].good + graphic[i][1].doa + graphic[i][1].orphan
        graphic[i].splice(2,2)
      }
      res.json(graphic)
    })
}
