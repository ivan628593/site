 request = require('request');
 const DB = require('./DB')

exports.list = function (req,res) {
  let   coin = DB.listAlgoritm
  let requests = coin.map(function (url) {
      return new Promise((resolve, reject) => {
            request('http://p2p-ekb.xyz:'+url.port+'/rate', (err, response, rate) => {
              // if(err)
              //   console.log(err,{port:coin.port});
                //coin.rate = rate
                request('http://p2p-ekb.xyz:'+url.port+'/users', (err, response, users) => {
                // if(err)
                //   // console.log(err,{port:coin.port});
                  //coin.users = users.length -1
                  request('http://p2p-ekb.xyz:'+url.port+'/fee', (err, response, fee) => {
                  // if(err)
                  //   // console.log(err,{port:coin.port});
                    //coin.fee = fee
                    request('http://p2p-ekb.xyz:'+url.port+'/global_stats', (err, response, global_stats) => {
                    // if(err)
                    //   // console.log(err,{port:coin.port});
                      let result = {
                        name:url.name,
                        fullName:url.fullName,
                        algoritm:url.algoritm,
                        rate: rate,
                        users:users,
                        fee:fee,
                        global_stats: global_stats
                      }
                      resolve(result)
                    });
                  });
                });
              });
      })

    });

  Promise.all(requests)
    .then(function (result) {
      let data = []
        let buffer = []
        let j = 0
        let k = 0
        let property = 'algoritm'
        // buffer[j].algoritm = result[j].algoritm
        for (let i = 0; i < result.length; i++) {
          //console.log(i);
          buffer[k] = result[i]
          // if(result[i].global_stats !=undefined){
            result[i].global_stats = JSON.parse(result[i].global_stats)
          // }
          k++
          if(result[i+1] === undefined   ||  result[i].algoritm !== result[i+1].algoritm){
              // data[j].algoritm = result[i].algoritm
              // data[j].coins = buffer
              data[j] = {algoritm:result[i].algoritm,coins:buffer}
              j++;
              k = 0
              buffer = []
              //data[j].algoritm = result[i+1].algoritm
          }
        }
      //res.json(data)
        res.render('blank',{data})
    });
}
