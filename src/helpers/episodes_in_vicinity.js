/**
 * # Get Episodes Around Vote
 * @param  {Number} VICINITY_SIZE Number of episode to include before and after
 * @param  {Object} vote          Vote entry
 * @param  {Number} vote.episode_id  Episode ID of that vote
 * @param  {Object} show          Show entry
 * @param  {Object} show.links    Assosiations included in show
 * @param  {Object} show.links.episodes  IDs of episodes of that show
 * @return {Array}  Array of episode IDs
 */
module.exports = function getEpisodesAroundVote(VICINITY_SIZE, vote, show) {
  if (!vote || !show || !show.links || !show.links.episodes) {
    return [];
  }

  var epList = show.links.episodes;
  var lastVotedEp = vote.episode_id;
  var index = epList.indexOf(lastVotedEp);

  if (index < 0) {
    // console.error('vote not in ep list', vote, show);
    return [];
  }

  var start = Math.max(index - VICINITY_SIZE, 0);
  var end = Math.min(index + VICINITY_SIZE + 1, epList.length);
  // if (start === 0 || end === epList.length) {
    // console.log('vicinity bounds reached', show.name, index, min, max);
  // }

  // Remember: `slice(start, end)` where start is included, but end is not!
  var epsInVicinity = epList.slice(start, end);
  // if (epsInVicinity.length < (VICINITY_SIZE * 2 + 1)) {
    // console.log('small vicinity!', epsInVicinity.length, vote, show);
  // }
  return epsInVicinity;
};
