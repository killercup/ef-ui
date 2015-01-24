var expect = require('chai').expect;
var l = require('lodash');

var t = require('./episodes_in_vicinity');

// Range function, pretty usefule to generate arrays of "episode IDs".
// `l.range(1, 42)` will include numbers from 1 up to 41 (i.e, not including
// 42)! So, here is an inclusive range function.
function range(start, end) {
  return l.range(start, end + 1);
}

describe("Helper: Get Episodes in Vicinity", function () {
  it("returns the correct episodes", function () {
    var eps = range(1, 42);

    expect(
      t(3, {episode_id: 6}, {links: {episodes: eps}})
    ).to.eql(range(3, 9));

    expect(
      t(1, {episode_id: 4}, {links: {episodes: eps}})
    ).to.eql(range(3, 5));

    expect(
      t(9, {episode_id: 12}, {links: {episodes: eps}})
    ).to.eql(range(3, 21));
  });

  it("handles lower bounds", function () {
    var eps = range(1, 42);

    expect(
      t(3, {episode_id: 2}, {links: {episodes: eps}})
    ).to.eql(range(1, 5));

    expect(
      t(12, {episode_id: 5}, {links: {episodes: eps}})
    ).to.eql(range(1, 17));
  });

  it("handles upper bounds", function () {
    var eps = range(1, 42);

    expect(
      t(3, {episode_id: 42}, {links: {episodes: eps}})
    ).to.eql(range(39, 42));

    expect(
      t(5, {episode_id: 39}, {links: {episodes: eps}})
    ).to.eql(range(34, 42));
  });
});
