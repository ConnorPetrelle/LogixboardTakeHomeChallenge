import { ORGANIZATION_TYPE } from "./models/organizationInterface";
import { SHIPMENT_TYPE } from "./models/shipmentInterface";

const express = require('express')
const bodyParser = require("body-parser");

const app = express()
app.use(bodyParser.json());
const port = 3000

var shipments: any[] = []
var organizations: any[] = []

/** Add Shipment */

app.post('/shipment', async (req: any, res: any) => {
  try {
    if (req.body.type !== SHIPMENT_TYPE) {
      res.status(400)
        .send("Invalid type. Expected the type '" + SHIPMENT_TYPE + "', received the type '" + req.body.type + "'.")
    }

    const shipment: any = req.body;
    const invalidOrgCodes: any[] = getInvalidShipmentOrganizationCodes(shipment)

    if (invalidOrgCodes.length > 0) {
      res.status(400)
         .send("Invalid organizations. No organization exists for the codes: " + invalidOrgCodes);
    }

    const isNew = addShipment(shipment);
    let message = "Shipment updated successfully";
    if (isNew) {
      message = "Shipment added successfully";
    }

    res.status(200)
       .send(message)

  } catch (e) {
    console.log(e)
    res.status(500)
       .send("Failed to add the shipment. Please try again.")
  }
})

function getInvalidShipmentOrganizationCodes(shipment: any) {
  const currentOrgCodes = new Set(organizations.map(org => org.code))
  const invalidOrgCodes = shipment.organizations.filter((org: any) => !currentOrgCodes.has(org.code))
  return invalidOrgCodes
}

/**
 * Adds or updates a shipment.
 * @param organization 
 * @returns boolean indicating if it was inserted (true) or updated (false)
 */
function addShipment(shipment: any) {
  const existingShipmentIndex = shipments.findIndex(s => shipment.referenceId = s.referenceId)
  const isNew = existingShipmentIndex === -1

  if (isNew) {
    shipments.push(shipment)
  } else {
    shipments[existingShipmentIndex] = shipment
  }

  return isNew
}

/** Add organization */

app.post('/organization', (req: any, res: any) => {
  try {
    if (req.body.type !== ORGANIZATION_TYPE) {
      res.status(400)
        .send("Invalid type. Expected the type '" + ORGANIZATION_TYPE + "', received the type '" + req.body.type + "'.")
    }

    const organization: any = req.body;
    const isNew = addOrganization(organization)
    let message = "Organization updated successfully"
    if (isNew) {
      message = "Organization added successfully";
    }

    res.status(200)
       .send(message)
  } catch (e) {
    console.log(e)
    res.status(500)
       .send("Failed to add the shipment. Please try again.")
  }
})

/**
 * Adds or updates an organization. Updates shipment organizations if the organization code is changed
 * @param organization 
 * @returns boolean indicating if it was inserted (true) or updated (false)
 */
function addOrganization(organization: any) {
  const existingOrgIndex = organizations.findIndex(org => org.id === organization.id)
  const isNew = existingOrgIndex === -1

  if (isNew) {
    organizations.push(organizations)
  } else {
    updateShipmentsOrganizationCode(organizations[existingOrgIndex].code, organization.code)
    organizations[existingOrgIndex] = organization
  }

  return isNew
}

function updateShipmentsOrganizationCode(oldOrgCode: any, newOrgCode: any) {
  if(oldOrgCode === newOrgCode) {
    return;
  }

  shipments.forEach((shipment, i) => {
    const oldOrgIndex = shipment.organizations.findIndex(oldOrgCode);
    if (oldOrgIndex !== -1) {
      shipment.organizations[oldOrgIndex] = newOrgCode;
      shipments[i] = shipment
    }
  })
}

/** Get shipment */

app.get('/shipments/:shipmentId', (req: any, res: any) => {
  res.send("Hello World");
})

/** Get Organization */

app.get('/organizations/:organizationId', (req: any, res: any) => {
  res.send("Hello World");
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
  