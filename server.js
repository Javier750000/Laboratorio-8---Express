let express=require("express");
let path=require("path");
let app=express();
let PORT=3000;

app.use(express.urlencoded({extended: true}));
app.use(express.json());

let mesas=[];
let esperas=[];

app.get("/", function(req, res)
{
  res.sendFile(path.join(__dirname, "home.html"));
});

app.get("/tables", function(req, res)
{
  res.sendFile(path.join(__dirname, "tables.html"));
});

app.get("/reserve", function(req, res)
{
  res.sendFile(path.join(__dirname, "reserve.html"));
});

app.get("/api/tables", function(req, res)
{
  res.json(mesas);
});

app.get("/api/waitlist", function(req, res)
{
  res.json(esperas);
});

app.post("/api/tables", function(req, res)
{
  let reservacion=req.body;
  if(mesas.length<5)
  {
    mesas.push(reservacion);
    res.json(true);
  }
  else
  {
    esperas.push(reservacion);
    res.json(false);
  }
});

app.post("/api/clear", function(req, res)
{
  mesas=[];
  esperas=[];
});

app.listen(PORT, function()
{
  console.log("App listening on PORT "+PORT);
});