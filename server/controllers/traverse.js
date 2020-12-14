const nodemailer = require('nodemailer');
const fs = require('fs');
const path = require('path');
const Web3 = require('web3');
const web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:7545'));
// Read the compiled contract code
// Compile with
// solc SampleContract.sol --combined-json abi,asm,ast,bin,bin-runtime,clone-bin,devdoc,interface,opcodes,srcmap,srcmap-runtime,userdoc > contracts.json
const buildContractPath = path.join(__dirname, '../../blockchain/build/contracts', `Traverse.json`);
const Contract = fs.readFileSync(buildContractPath);
const abi = JSON.parse(Contract)['abi'];
const networks = JSON.parse(Contract)['networks'];

/**
 * Endpoints
 */
exports.move = async (req, res) => {
    const { address, pos, networkId } = req.body;

    console.log(networks);
    console.log(networkId);
    const Traverse = new web3.eth.Contract(abi, networks[networkId].address);
    Traverse.methods
        .move([2, 1, 7, 42])
        .send({ from: address })
        .then((tx) => {
            res.status(201).send({
                code: 201,
                status: 'success',
                message: 'Template successfully created',
            });
        })
        .catch((err) => console.log(err));
};
