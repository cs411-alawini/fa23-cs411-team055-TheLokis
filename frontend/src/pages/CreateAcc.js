import * as React from "react";

function CreateAcc() {
  return (
    <>
        <h2>Create Account</h2>
        <form>
            <label>
                Username:
                <input type="text" name="usename" />
            </label><br/>
            <label>
                Password (numbers only):
                <input type="number" min="0" step="1" name="password" />
            </label><br/>
            <input type="submit" value="Create Account" />
        </form>
    </>
  );
}

export default CreateAcc;
