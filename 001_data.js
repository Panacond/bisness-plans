// Данные для таблиц
const lettuce = {
  name: function(){return "латук " + this.count() + "шт"},
  cost: 17,
  unit:"грн/пучок",
  time:70,
  square:0.1*0.1,
  count: function(){
    return Math.round(stack.sq()/stack.count/this.square)
  },
  incomePerMount: function(){
    return Math.round(this.count()*30/this.time*this.cost)
  },
  priceOfOneSeed: 30/30*2
};
const parsley ={
  name: function(){return "петрушка " + this.count() + "шт"},
  cost: 20,
  unit:"грн/пучок",
  time:60,
  square:0.07*0.07,
  count: function(){
    return Math.round(stack.sq()/stack.count/this.square)
  },
  incomePerMount: function(){
    return Math.round(this.count()*30/this.time*this.cost)
  },
  priceOfOneSeed: Math.ceil(15/10/500)

}

const stack = {
  h: 1.8,
  w: 0.64,
  l: 0.4,
  floor: 5,
  count: 2,
  price: 1200,
  sq: function () {
    return this.w * this.l * this.floor * this.count;
  },
};
const tray = {
  h: 0.06,
  w: 0.35,
  l: 0.25,
  price: 25,
  sq: function () {
    return this.w * this.l;
  },
  count: function() {
    return Math.round((stack.count * stack.sq()/this.sq()));
  },
  volume: function(){
    return this.count()*this.h*this.w*this.l}
};
 const substrate = {
   price : 65,
   volume : function(){ return 0.1**3*10},
   count :function (){ return  Math.round(tray.volume()/this.volume())
   },
 };
const start = [
  {
    description: "Стеллажи "+stack.count+ "шт." + stack.sq() + "м.кв",
    price: stack.count * stack.price,
    time: 4,
    worker: 150,
  },
  {
    description: "Лотки "+tray.count()+"шт.",
    price: tray.price *tray.count(),
    time: 1,
    worker: 150,
  },
  {
    description: "Почвосмесь/Субстрат",
    price: substrate.price* substrate.count(),
    time: 3,
    worker: 150,
  },
  {
    description: "Семена : " + lettuce.name(),
    price: lettuce.count()*lettuce.priceOfOneSeed,
    time: 3,
    worker: 150,
  },
  {
    description: "Семена : " + parsley.name(),
    price: parsley.count()*parsley.priceOfOneSeed,
    time: 3,
    worker: 150,
  },
  { description: "Прочий инвентарь", price: 300, time: 1, worker: 150 },
  {
    description: "Упаковка",
    price: (parsley.count()+lettuce.count())*0.75,
    time: 6,
    worker: 150,
  },
];

const cost = [
  {
    description: "Семена : " + lettuce.name(),
    price: lettuce.count()*lettuce.priceOfOneSeed,
    time: 3,
    worker: 150,
  },
  {
    description: "Семена : " + parsley.name(),
    price: parsley.count()*parsley.priceOfOneSeed,
    time: 3,
    worker: 150,
  },
  { description: "Прочий инвентарь", price: 300, time: 1, worker: 150 },
  {
    description: "Упаковка",
    price: (parsley.count()+lettuce.count())*0.75,
    time: 6,
    worker: 150,
  },
];

const income = [
  { description: lettuce.name(), price: lettuce.incomePerMount() },
  { description: parsley.name(), price: parsley.incomePerMount() },
];
