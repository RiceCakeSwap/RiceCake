const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("RiceCake Test", function () {
  let token;
  let riceCake;
  let owner, addr1, addr2, addr3, addr4, addr5, addr6, addr7;

  beforeEach(async function () {
    token = await ethers.getContractFactory('RiceCake');
    [owner, addr1, addr2, addr3, addr4, addr5, addr6, addr7] = await ethers.getSigners();

    riceCake = await token.deploy();

    riceCake.transfer(addr1.address, 100 * 10**9);
    riceCake.transfer(addr2.address, 100 * 10**9);
    riceCake.transfer(addr3.address, 100 * 10**9);
    riceCake.transfer(addr4.address, 100 * 10**9);
    riceCake.transfer(addr5.address, 100 * 10**9);
    riceCake.transfer(addr6.address, 100 * 10**9);
    riceCake.transfer(addr7.address, 100 * 10**9);
  });

  describe('Only owner function', () => {
    it('Functoin: excludeFromReward & includeInReward', async () => {
      let res;
      res = await riceCake.isExcludedFromReward(addr1.address);
      expect(res).to.equal(false);

      await riceCake.excludeFromReward(addr1.address);

      res = await riceCake.isExcludedFromReward(addr1.address);
      expect(res).to.equal(true);

      await riceCake.includeInReward(addr1.address);

      res = await riceCake.isExcludedFromReward(addr1.address);
      expect(res).to.equal(false);
    });
  });

  describe('Public function', () => {
    it('Functoin: name', async () => {
      const res = await riceCake.name();

      expect(res).to.equal("RiceCake");
    });

    it('Functoin: symbol', async () => {
      const res = await riceCake.symbol();

      expect(res).to.equal("RICE");
    });

    it('Functoin: decimals', async () => {
      const res = await riceCake.decimals();

      expect(res).to.equal(9);
    });

    it('Functoin: totalSupply', async () => {
      const res = await riceCake.totalSupply();

      expect(parseInt(res._hex, 16)).to.equal(10**9 * 10**9);
    });

    it('Functoin: totalFees', async () => {
      const res = await riceCake.totalFees();

      expect(parseInt(res._hex, 16)).to.equal(0);
    });

    it('Functoin: setMaxTxPercent', async () => {
      await riceCake.setMaxTxPercent(11);
    });

    it('Functoin: deliver', async () => {
      const _sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
      await _sleep(500);

      let res;
      res = await riceCake.connect(addr1).balanceOf(addr1.address);
      expect(res).to.equal(100000000000);

      res = await riceCake.connect(addr2).balanceOf(addr2.address);
      expect(res).to.equal(100000000000);

      res = await riceCake.connect(addr3).balanceOf(addr3.address);
      expect(res).to.equal(100000000000);

      await riceCake.deliver(100 * 10**9);

      res = await riceCake.connect(addr1).balanceOf(addr1.address);
      expect(res).to.equal(100000010000);

      res = await riceCake.connect(addr2).balanceOf(addr2.address);
      expect(res).to.equal(100000010000);

      res = await riceCake.connect(addr3).balanceOf(addr3.address);
      expect(res).to.equal(100000010000);
    });

    it('Functoin: isExcludedFromReward', async () => {
      let res;
      res = await riceCake.isExcludedFromReward(owner.address);

      expect(res).to.equal(false);
    });

    it('Functoin: transfer', async () => {
      // const res = await riceCake.totalSupply();

      // expect(parseInt(res._hex, 16)).to.equal(10**9 * 10**9);
    });
  });

});
