const { ethers } = require('hardhat')

const contracts = {}
const users = {}
beforeEach(async function () {
  [users.user1] = await ethers.getSigners()
  const Contract = await ethers.getContractFactory('Test')
  contracts.Test = await Contract.deploy()
})



describe('mint(address, tokenId, tokenURI)', () => {
  it('defines a mintedFor(tokenId) with the original recipient', async () => {
    const tokenId = +new Date()
    await contracts.Test.mint(users.user1.address, tokenId)

    const mintedFor = await contracts.Test.mintedFor(tokenId)
    expect(mintedFor).toEqual(users.user1.address)
  })
})

describe('tokenURI(tokenId)', () => {
  it('returns a base64 data json', async () => {
    const tokenId = +new Date()
    await contracts.Test.mint(users.user1.address, tokenId)
    const tokenURI = await contracts.Test.tokenURI(tokenId)
    expect(tokenURI).toMatch(/^data:application\/json;base64,/)
  })

  it('returns a valid json', async () => {
    const tokenId = +new Date()
    await contracts.Test.mint(users.user1.address, tokenId)

    const tokenURI = await contracts.Test.tokenURI(tokenId)
    const data = tokenURI.slice(tokenURI.indexOf(',') + 1)
    const buffer = Buffer.from(data, 'base64');
    const json = JSON.parse(buffer.toString())
    expect(json).toBeInstanceOf(Object)
  })

  it('returns correct mintedFor', async () => {
    const tokenId = +new Date()
    await contracts.Test.mint(users.user1.address, tokenId)

    const tokenURI = await contracts.Test.tokenURI(tokenId)
    const data = tokenURI.slice(tokenURI.indexOf(',') + 1)
    const buffer = Buffer.from(data, 'base64');
    const json = JSON.parse(buffer.toString())
    expect(json.mintedFor).toEqual(String(users.user1.address).toLowerCase())
  })

  it.each`
  attribute | value
  ${'attribute'} | ${'value'}
  `('returns correct value for "$attribute"', async ({ attribute, value }) => {
    const tokenId = +new Date()
    await contracts.Test.mint(users.user1.address, tokenId)

    const tokenURI = await contracts.Test.tokenURI(tokenId)
    const data = tokenURI.slice(tokenURI.indexOf(',') + 1)
    const buffer = Buffer.from(data, 'base64');
    const json = JSON.parse(buffer.toString())
    expect(json[attribute]).toEqual(value)
  })
})
