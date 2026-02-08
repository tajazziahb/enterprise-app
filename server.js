const express = require('express');
const path = require('path');
const { buildProfile, generateEmployeeHandbook, generateContractorAgreement } = require('./lib/employeeHandbook.js');


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
            industry: "professionalServices",
            location: "",
        }
    });
})

app.post('/generate', (req, res) => {
    const profile = buildProfile(req.body);

    let preview = null;

    if (profile.documentType === "contractorAgreement") {
        preview = generateContractorAgreement(profile);
    } else {
        preview = generateEmployeeHandbook(profile);
    }

    res.render('index', {
        title: "Document Generator",
        preview,
        form: {
            type: req.body.type || "employeeHandbook",
            businessName: req.body.businessName || "",
            size: req.body.size || "1-10",
            location: req.body.location || "",
            industry: req.body.industry || "professionalServices",
        },
    });
});

const port = process.env.PORT || 4000;
app.listen(port, () => console.log('We are live folks 🔥 !"'));
