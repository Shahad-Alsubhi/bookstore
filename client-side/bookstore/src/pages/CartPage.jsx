
import { MdDeleteOutline } from "react-icons/md";
import "../css/cartPage.css";
// import { useNavigate } from "react-router-dom";
import useCart from "../hook/useCart";

const CartPage = () => {
  // const [cartItems, setCartItems] = useState([]);
  // const navigate = useNavigate();

  // const [change, setChange] = useState(false);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     if(!user){
  //       navigate("/books/login");
  //     }
  //     else{
  //     const cartItems= await fetchCartItems();
  //     setCartItems(cartItems)
  //   }};

  //   fetchData();
  // }, [change]);

  // const handleIncrease=async (item)=>{
  //   const res = await fetch(`http://localhost:5500/users/user/cartItems/handleIncrease/${item._id}`,{
  //     method:"put"
  //   })

  //   setChange(!change);

  // }
  // const handleDecrease=async (item)=>{
  //   if(item.quantity>1){

  //   const res = await fetch(`http://localhost:5500/users/user/cartItems/handleDecrease/${item._id}`,{
  //     method:"put"
  //   })
  //   // if res
  //   setChange(!change);}

  // }
  // const fetchCartItems = async () => {
  //       const res = await fetch(`http://localhost:5500/users/user/cartItems`, {
  //     headers: {
  //       "Content-Type": "application/json",
  //       Authorization: `Bearer ${user}`,
  //     },
  //   })

  //   const {cartItems}  = await res.json();
  //       return cartItems;
  //     //  else {

  //     //   Swal.fire({
  //     //     position: "top-center",
  //     //     icon: "error",
  //     //     title: "Somthing went wrong, please try again",
  //     //     showConfirmButton: false,
  //     //     timer: 1500,
  //     //   });
  //     // }
  //   // });
  //   // return [];

  // };

  // const calculateTotal=()=>{
  //   console.log("calc")

  //   return cartItems.reduce((accumulator, currentValue) => {
  //     return accumulator + (currentValue.quantity*currentValue.price);
  //   }, 0).toFixed(2);

  // }
  const {
    cartItems,
    handleDeleteItem,
    handleIncrease,
    handleDecrease,
    calculateTotal,
    handlecheckout
  } = useCart();

 
  return (
    <div className="container" style={{ justifyContent: "center" }}>
      <h1 style={{ textAlign: "center" }}>Items Added to The Cart</h1>
      {cartItems.length > 0 && (
        <div className="tableContainer">
          <table className="table">
            <thead>
              <tr>
                <th>#</th>
                <th>Book</th>
                <th>Book Title</th>
                <th>Quantity</th>
                <th>Price</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item, index) => (
                <tr key={item._id}>
                  <td>{index + 1}</td>
                  <td>
                    <img
                      src={`${item.book.bookCover}`}
                      alt=""
                      className="book-cover-img"
                    />
                  </td>
                  <td>{item.book.title}</td>

                  <td>
                    <button
                      className="quantity-button"
                      onClick={() => handleDecrease(item)}
                    >
                      -
                    </button>
                    {item.quantity}
                    <button
                      className="quantity-button"
                      onClick={() => handleIncrease(item)}
                    >
                      +
                    </button>
                  </td>
                  <td>SAR{(item.book.price * item.quantity).toFixed(2)}</td>
                  <td>
                    <MdDeleteOutline
                      style={{ color: "red", cursor: "pointer" }}
                      onClick={() => {
                        handleDeleteItem(item);
                      }}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <h2>total: SAR{calculateTotal()}</h2>
          <button className="checkout-btn" onClick={handlecheckout}>
            checkout using credit card!
          </button>
        </div>
      )}
    </div>
  );
};

export default CartPage;
