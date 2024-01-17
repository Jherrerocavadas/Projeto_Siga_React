function Item(props) {
    return <li>{props.value}</li>;
 }
 
 function MyList(items) {
    return (
     <ul>
       {items.map((item) => <Item key={item.key} value={item} />)}
     </ul>
   );
 }