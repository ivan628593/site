const request = require('request');
const DB = require('./DB')

exports.getCoinStatisticData = function (req,res) {
 let   coins = DB.listAlgoritm
 let promise = []
 let coin = coins.find(item => item.port == req.params.id)
 promise[0] = new Promise(function(resolve, reject) {
     request('http://p2p-ekb.xyz:'+coin.port+'/rate', (err, response, rate) => {
       resolve({name:'rate',value:rate})
     })
 });
 promise[1] = new Promise(function(resolve, reject) {
     request('http://p2p-ekb.xyz:'+coin.port+'/difficulty', (err, response, difficulty) => {
       resolve({name:'difficulty',value:difficulty})
     })
 });
 promise[2] = new Promise(function(resolve, reject) {
     request('http://p2p-ekb.xyz:'+coin.port+'/fee', (err, response, fee) => {
       resolve({name:'fee',value:fee})
     })
 });
 promise[3] = new Promise(function(resolve, reject) {
     request('http://p2p-ekb.xyz:'+coin.port+'/local_stats', (err, response, local_stats) => {
       resolve({name:'local_stats',value:local_stats})
     })
 });
 promise[4] = new Promise(function(resolve, reject) {
   request('http://p2p-ekb.xyz:'+coin.port+'/users', (err, response, users) => {
     users = users.length -1
     resolve({name:'users',value:users})
   })

 });
 promise[5] = new Promise(function(resolve, reject) {
   request(`http://p2p-ekb.xyz:${coin.port}/web/graph_data/pool_rates/last_hour`, (err, response, graphic) => {
     resolve({name:'graphic',value:graphic})
   })

 });
 Promise.all(promise).then(function (result) {
   let coinStatisticData = {}
   for (var i = 0; i < result.length; i++) {
     coinStatisticData[result[i].name] = result[i].value
   }
   coinStatisticData.local_stats = JSON.parse(coinStatisticData.local_stats)
   coinStatisticData.graphic = JSON.parse(coinStatisticData.graphic)
   coinStatisticData.port = coin.port
   coinStatisticData.fullName = coin.fullName
   coinStatisticData.algoritm = coin.algoritm
   coinStatisticData.name = coin.name
//   res.json(coinStatisticData)
   res.render('pool',{coinStatisticData})
 })
}
