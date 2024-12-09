import Login from "./components/forms/login/Login";

export default function Home() {
  return <Login />;
}

// import { useSelector, useDispatch } from "react-redux";
// import { plusValue, minusValue, setValue } from "./redux/features/counterSlice";
// import { RootState } from "./redux/store";

// const count = useSelector((state: RootState) => state.counter.value);
// const dispatch = useDispatch();

// <h1>count is {count}</h1>
// <button onClick={() => dispatch(plusValue())}>click PLUS</button>
// <button onClick={() => dispatch(setValue(2))}>incresse with 2</button>
// <button onClick={() => dispatch(minusValue())}>click MINUS</button>
