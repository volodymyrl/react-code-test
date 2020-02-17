/**
 * create action creator function
 * @param {String} type - action type
 * @param {Any} type - action payload
 * @returns {Function} action creator
 *
 * @example
 * const actionWithPayload = createAction('INCREMENT')(2);
 * actionWithPayload()
 * returns {payload: 2, type: 'INCREMENT'}
 * @example
 * const action = createAction('INCREMENT');
 * action(2)
 * returns {payload: 2, type: 'INCREMENT'}
 */
export const createAction = type => payload => ({
  payload,
  type
});

/** Helper for simple test reducers
 * @param  {Function} rootReducer
 * @param  {Any} initialState
 *
 * @example
 * testReducer(rootReducer, 1)
 *  .put(incrementAction)
 *  .expect(selectValue, 2)
 */
export function testReducer(rootReducer, initialState) {
  if (!(this instanceof testReducer)) {
    return new testReducer(rootReducer, initialState);
  }

  this.state = rootReducer(initialState, { type: "MOCK_ACTION" });

  this.put = function(action) {
    this.state = rootReducer(this.state, action);
    return this;
  };

  this.expect = function(selector, value) {
    expect(selector(this.state)).toEqual(value);
    return this;
  };
}
