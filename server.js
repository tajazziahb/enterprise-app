const express = require('express');
const path = require('path');

const app = express();
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")))

app.get('/', (req, res) => {
    res.render('index', { 
        title: "Document Generator",
        preview: null, 
        form: {
            type: "employeeHandbook", 
            businessName: "",
            size: "1-10",
            industry: "sales",
            location: "",
        } 
     });
})

const port = process.env.PORT || 4000;
app.listen(port, () => console.log('We are live folks 🔥 !"'))