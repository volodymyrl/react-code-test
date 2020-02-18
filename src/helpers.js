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

/**
 * The result of the debounce decorator (f, ms) should be a wrapper
 * that should be called no more than once in ms milliseconds.
 * @param {Function} func - callback function
 * @param {Number} ms - timeout in milliseconds
 */
export const debounce = (func, ms) => {
  let isCooldown = false;

  return function() {
    if (isCooldown) return;

    func.apply(this, arguments);
    isCooldown = true;

    setTimeout(() => (isCooldown = false), ms);
  };
};
