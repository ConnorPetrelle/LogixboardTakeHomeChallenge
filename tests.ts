import axios from 'axios'

const HOST = "http://localhost:3002"

async function main() {
  try {
    await testGetShipmentSuccess()
  } catch(e) { console.log("EXCEPTION: " + e.response.data + "\n******\n") }

  try {
    await testGetShipmentDoesNotExist()
  } catch(e) { console.log("EXCEPTION: " + e.response.data + "\n******\n") }

  try {
    await testGetOrganizationSuccess()
  } catch(e) { console.log("EXCEPTION: " + e.response.data + "\n******\n") }

  try {
    await testGetOrganizationDoesNotExist()
  } catch(e) { console.log("EXCEPTION: " + e.response.data + "\n******\n") }
}

/** Get shipment tests */

async function testGetShipmentSuccess() {
    console.log("*** GET SHIPMENT SUCCESS TEST ***")

    const referenceId = "S00001175"
    const expectedShipment = {
    "type": "SHIPMENT",
    "referenceId": referenceId,
    "organizations": [],
    "transportPacks": {
      "nodes": [
        {
          "totalWeight": {
            "weight": "0",
            "unit": "KILOGRAMS"
          }
        }
      ]
    }
  }

  await axios.post(`${HOST}/shipment`, expectedShipment);
  const response = await axios.get(`${HOST}/shipments/${referenceId}`)

  console.log(`Status: Expected[200], Actual[${response.status}]`)
  console.log(`Expected[${JSON.stringify(expectedShipment)}]\nActual[${JSON.stringify(response.data)}]`)
  console.log("******\n")
}

async function testGetShipmentDoesNotExist() {
    console.log("*** GET SHIPMENT DOES NOT EXIST TEST ***")

    try {
      const response = await axios.get(`${HOST}/shipments/0`)
      console.log("Unexpectedly received a response")
      console.log(`Status: Expected[404], Actual[${response.status}]`)
      console.log(`Data[${JSON.stringify(response.data)}]`)
    } catch (e) {
      console.log(`Status: Expected[404], Actual[${e.response.status}]`)
      console.log(`Data[${JSON.stringify(e.response.data)}]`)
    }  

    console.log("******\n")
}

/** Get organization tests */

async function testGetOrganizationSuccess() {
    console.log("*** GET ORGANIZATION SUCCESS TEST ***")

    const guid = "34f195b5-2aa1-4914-85ab-f8849f9b541a"
    const expectedOrganization =   {
      "type": "ORGANIZATION",
      "id": guid,
      "code": "FMT"
    }

  await axios.post(`${HOST}/organization`, expectedOrganization);
  const response = await axios.get(`${HOST}/organizations/${guid}`)

  console.log(`Status: Expected[200], Actual[${response.status}]`)
  console.log(`Expected[${JSON.stringify(expectedOrganization)}]\nActual[${JSON.stringify(response.data)}]`)
  console.log("******\n")
}

async function testGetOrganizationDoesNotExist() {
    console.log("*** GET ORGANIZATION DOES NOT EXIST TEST ***")
    
    try {
      const response = await axios.get(`${HOST}/organizations/0`)
      console.log("Unexpectedly received a response")
      console.log(`Status: Expected[404], Actual[${response.status}]`)
      console.log(`Data[${JSON.stringify(response.data)}]`)
    } catch (e) {
      console.log(`Status: Expected[404], Actual[${e.response.status}]`)
      console.log(`Data[${JSON.stringify(e.response.data)}]`)
    }    

    console.log("******\n")
}



main()