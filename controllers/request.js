 request = require('request');
var statistic  = {
  rate:0,
  difficulty:0,
  users:0,
  user_stales:0,
  fee:0,
  current_payouts:0,
  global_stats:0,
  local_stats:0,
  peer_addresses:0,
  pings:0,
  recent_blocks:0,
  currency_info:0,
  local_hash_rate:{
          last_hour:0,
          last_day:0,
          last_week:0,
          last_month:0,
          last_year:0
  },
  pool_rates:{
          last_hour:0,
          last_day:0,
          last_week:0,
          last_month:0,
          last_year:0
  },
  miner_hash_rates:{
          last_hour:0,
          last_day:0,
          last_week:0,
          last_month:0,
          last_year:0
  },
  current_payouts:{
          last_hour:0,
          last_day:0,
          last_week:0,
          last_month:0,
          last_year:0
  },
}
exports.request = function (req,res) {
let promise = new Promise(function(resolve, reject) {
  request('http://sha256.p2p-spb.xyz:9338/rate', (err, response, rate) => {
  if(err)
    console.log(err);
    statistic.rate = rate
    return rate
  });

  request('http://sha256.p2p-spb.xyz:9338/difficulty', (err, response, difficulty) => {
  if(err)
    console.log(err);
    statistic.difficulty = difficulty
    //console.log(response);
    return difficulty
  });
  request('http://sha256.p2p-spb.xyz:9338/users', (err, response, users) => {
  if(err)
    console.log(err);
    statistic.users = users
    //console.log(response);
    return users
  });
  request('http://sha256.p2p-spb.xyz:9338/user_stales', (err, response, user_stales) => {
  if(err)
    console.log(err);
    statistic.user_stales = user_stales
    //console.log(response);
    res.json(statistic)
    return user_stales
  });
  request('http://sha256.p2p-spb.xyz:9338/fee', (err, response, fee) => {
  if(err)
    console.log(err);
    statistic.fee = fee
    //console.log(response);
    return fee
  });
  request('http://sha256.p2p-spb.xyz:9338/current_payouts', (err, response, current_payouts) => {
  if(err)
    console.log(err);
    statistic.current_payouts = current_payouts
    //console.log(response);
    return current_payouts
  });
  request('http://sha256.p2p-spb.xyz:9338/global_stats', (err, response, global_stats) => {
  if(err)
    console.log(err);
    statistic.global_stats = global_stats
    //console.log(response);
    return global_stats
  });
  request('http://sha256.p2p-spb.xyz:9338/local_stats', (err, response, local_stats) => {
  if(err)
    console.log(err);
    statistic.local_stats = local_stats
    //console.log(response);
    return local_stats
  });
  request('http://sha256.p2p-spb.xyz:9338/peer_addresses', (err, response, peer_addresses) => {
  if(err)
    console.log(err);
    statistic.peer_addresses = peer_addresses
    //console.log(response);
    return peer_addresses
  });
  request('http://sha256.p2p-spb.xyz:9338/pings', (err, response, pings) => {
  if(err)
    console.log(err);
    statistic.pings = pings
    //console.log(response);
    return pings
  });
  request('http://sha256.p2p-spb.xyz:9338/recent_blocks', (err, response, recent_blocks) => {
  if(err)
    console.log(err);
    statistic.recent_blocks = recent_blocks
    //console.log(response);
    return recent_blocks
  });
  request('http://sha256.p2p-spb.xyz:9338/web/currency_info', (err, response, currency_info) => {///////
  if(err)
    console.log(err);
    statistic.currency_info = currency_info
    //console.log(response);
    return currency_info
  });
  request('http://sha256.p2p-spb.xyz:9338/local_hash_rate/last_hour', (err, response, local_hash_rate_last_hour) => {
  if(err)
    console.log(err);
    statistic.local_hash_rate = local_hash_rate_last_hour
    //console.log(response);
    return local_hash_rate_last_hour
  });
  request('http://sha256.p2p-spb.xyz:9338/web/graph_data/pool_rates/last_hour', (err, response, pool_rates_last_hour) => {
  if(err)
    console.log(err);
    statistic.pool_rates_last_hour = pool_rates_last_hour
    //console.log(response);
    return pool_rates_last_hour
  });
  request('http://sha256.p2p-spb.xyz:9338/web/graph_data/miner_hash_rates/last_hour', (err, response, miner_hash_rates_last_hour) => {
  if(err)
    console.log(err);
    statistic.miner_hash_rates_last_hour = miner_hash_rates_last_hour
    //console.log(response);
    return miner_hash_rates_last_hour
  });
  request('http://sha256.p2p-spb.xyz:9338/web/graph_data/current_payouts/last_hour', (err, response, current_payouts_last_hour) => {
  if(err)
    console.log(err);
    statistic.current_payouts_last_hour = current_payouts_last_hour
    //console.log(response);
    return current_payouts_last_hour
  });
  //resolve(rate,difficulty,users,user_stales)
});
promise.then(function(statistic) {
  res.json(statistic)
});
}
