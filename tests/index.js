require('mocha');
const chai = require('chai');
const expect = require('chai').expect;
const axios = require('axios');

chai.should();

describe('Test API', () => {

    const data = {
        "game": {
          "id": "M674EZ8NPWi7W7G55PVG5P",
          "created": "2022-03-22T17:18:26.259101-03:00",
          "state": {
            "code": "1",
            "description": "CREATED"
          }
        },
        "cells": []
      };

    describe('GET/game/:id', () => {

        it('It should find or create a game', (done) => {
            const id = 1234;
            axios
            .get(`http://localhost:3000/api/game/${id}`)
            .then(res => {
                expect(res.data).to.be.an('object');
                expect(parseInt(res.data.game.id)).to.be.equal(id);
                expect(res.data).to.not.be.empty;
                done()
            })
            .catch(err => done(err));
        })
        });

    describe('GET/game/:id', () => {

        it('It should return all saved games', (done) => {
            axios
            .get(`http://localhost:3000/api/game`)
            .then(res => {
                expect(res.data).to.be.an('array');
                done()
            })
            .catch(err => done(err));
        })
        });

    describe('POST/game', () => {

        it('It should save a new game and return it', (done) => {    
            axios
            .post(`http://localhost:3000/api/game`, data)
            .then(res => {
                expect(res.data).to.not.be.empty;
                done();
            })
            .catch(err => done(err));
        })

        it('It should return status 500 if id game already exists', (done) => {
            axios
            .post(`http://localhost:3000/api/game`, data)
            .then(res => {
                res.should.have.status(500);
                res.data.expect.not.to.be.an('object');
            })
            done()
            .catch(err => done(err));
        })
    })
})