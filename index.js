const express = require('express');
const axios = require('axios');
const app = express();

app.set('view engine', 'pug');
app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// * Please include the private app access token in your repo BUT only an access token built in a TEST ACCOUNT. Don't do this practicum in your normal account.
const PRIVATE_APP_ACCESS = 'pat-na1-e3257a32-21fa-4820-9d90-9703b3daf671';

// TODO: ROUTE 1 - Create a new app.get route for the homepage to call your custom object data. Pass this data along to the front-end and create a new pug template in the views folder.
app.get('/', async (req, res) => {
    const maisons = 'https://api.hubspot.com/crm/v3/objects/p_maisons?properties=name&properties=couleur&properties=chambre';
    const headers = {
        Authorization: `Bearer ${PRIVATE_APP_ACCESS}`,
        'Content-Type': 'application/json'
    }
    try {
        const response = await axios.get(maisons, { headers });
        const data = response.data.results;
        res.render("home", { title: 'home', data });
        //res.json(data);    
    } catch (error) {
        console.error(error);
    }
});

//https://api.hubapi.com/crm/v3/schemas/p41623828_maisons


app.get('/update-cobj', async (req, res) => {
    const maisons = 'https://api.hubapi.com/crm/v3/objects/p_maisons';
    const headers = {
        Authorization: `Bearer ${PRIVATE_APP_ACCESS}`,
        'Content-Type': 'application/json'
    }
    try {
        const response = await axios.get(maisons, { headers });
        const data = response.data.results;
        res.render("updates", { title: " Update Custom Object Form | Integrating With HubSpot I Practicum", data});    
    } catch (error) {
        console.error(error);
    }
});

app.post('/update-cobj', async (req, res) => {
    const addNew = {
        properties: {
            "name": req.body.name,
            "couleur": req.body.couleur,
            "chambre": req.body.chambre
        }
    }

    const updateMaison = `https://api.hubapi.com/crm/v3/objects/p_maisons`;
    const headers = {
        Authorization: `Bearer ${PRIVATE_APP_ACCESS}`,
        'Content-Type': 'application/json'
    };

    try { 
        await axios.post(updateMaison, addNew, { headers } );
        res.redirect('back');
    } catch(err) {
        console.error(err);
    }

});
// * Code for Route 1 goes here

// TODO: ROUTE 2 - Create a new app.get route for the form to create or update new custom object data. Send this data along in the next route.

// * Code for Route 2 goes here

// TODO: ROUTE 3 - Create a new app.post route for the custom objects form to create or update your custom object data. Once executed, redirect the user to the homepage.

// * Code for Route 3 goes here

/** 
* * This is sample code to give you a reference for how you should structure your calls. 

* * App.get sample
app.get('/contacts', async (req, res) => {
    const contacts = 'https://api.hubspot.com/crm/v3/objects/contacts';
    const headers = {
        Authorization: `Bearer ${PRIVATE_APP_ACCESS}`,
        'Content-Type': 'application/json'
    }
    try {
        const resp = await axios.get(contacts, { headers });
        const data = resp.data.results;
        res.render('contacts', { title: 'Contacts | HubSpot APIs', data });      
    } catch (error) {
        console.error(error);
    }
});
/https://api.hubapi.com/crm/v3/objects/contacts/${email}?idProperty=email
* * App.post sample

*/


// * Localhost
app.listen(3000, () => console.log('Listening on http://localhost:3000'));