/**

Name: React Assignment 1
Authur: Shenglin Zhou
Date: 2017/9/30

**/


// Create sructures
// Create a header

let Header = React.createClass({
    propTypes: {
    },
    render: function() {
        return(
            React.createElement("div", {className: "header"},
                React.createElement("p", {}, "Address List")            
            )
        )
    }
}); 

// Create a Nav Menu

let NavMenu = React.createClass({
    render: function() {
        return (
// Add menu items
			
            React.createElement("ul", {className: "nav-menu"}, 
                React.createElement("li", {}, 
                    React.createElement("a", {href: "#"}, "List of Address")
                ),
                React.createElement("li", {},
                    React.createElement("a", {href: "#newitem"}, "Add an Address")
                )
            )
        )
    }
}); 


// Create and display list items on the main page

let ListItem = React.createClass({
// Setting names and email address as property
	
    propTypes: {
        id: React.PropTypes.number, 
        name: React.PropTypes.string.isRequired, 
        email: React.PropTypes.string.isRequired, 
        dob: React.PropTypes.string 
    },

// Create the html element of list items
	
    render: function() {
        return (
            React.createElement("li", {},
                React.createElement("a", {className: "menu-item-link", href: "#/item/" + this.props.id},
                    React.createElement("h2", {className: "list-item-name"}, this.props.name), 
                    React.createElement("div", {className: "email"}, this.props.email)
                   
                )
            )
        )
    }
});

// Create list

let ListItems = React.createClass({ 
    propTypes: {
        items: React.PropTypes.array.isRequired 
    },

    render: function() {
        return ( 
            React.createElement("ul", {className: "list-menu"}, this.props.items.map(i => React.createElement(ListItem, i)))
        )
    }
});


// Create pages
// Create main page

let ListPage = React.createClass({
    propTypes: {
        items: React.PropTypes.array.isRequired
    },

    render: function() {
        return ( 
            React.createElement(ListItems, {items: this.props.items}) 
        )
    }
}); 

// Create pages to show details

let ItemPage = React.createClass({
// Requires name and emails but dob is optional

    propTypes: {
        name: React.PropTypes.string.isRequired, 
        email: React.PropTypes.string.isRequired, 
        dob: React.PropTypes.string 
    },

    render: function() {
        return ( 
            React.createElement("div", {className: "list-menu"},
                React.createElement("h2", {className: "list-name-header"}, this.props.name),
                React.createElement("p", {}, this.props.email),
                React.createElement("p", {className: "list-name-header"}, this.props.dob)
                
            )
        )
    }
}); 

// Create page for users to add new items

let AddEntryForm = React.createClass({
    propTypes: {
        listItem: React.PropTypes.object.isRequired,
        onChange: React.PropTypes.func.isRequired,
        onSubmit: React.PropTypes.func.isRequired
    },
    onNameChange: function(e) {
        this.props.onChange(Object.assign({}, this.props.listItem, {name: e.target.value})); 
    },
    onemailChange: function(e) {
        this.props.onChange(Object.assign({}, this.props.listItem, {email: e.target.value}));
    },
    ondobChange: function(e) {
        this.props.onChange(Object.assign({}, this.props.listItem, {dob: e.target.value}));
    },
    onSubmit: function(e) {
        this.props.onSubmit(this.props.listItem);
    },
    render: function() { 
        return (
            React.createElement("form", {},
                React.createElement("input", {
                    type: "text",
                    placeholder: "Name",
                    value: this.props.listItem.name,
                    onChange: this.onNameChange
                }),
                React.createElement("input", {
                    type: "text",
                    placeholder: "Email",
                    value: this.props.listItem.email,
                    onChange: this.onemailChange
                }),
                React.createElement("textarea", {
                    placeholder: "Date of birth",
                    value: this.props.listItem.dob,
                    onChange: this.ondobChange
                }),
                React.createElement("button", {type: "button", onClick: this.onSubmit}, "Submit")
            )
        )
    }
});

let AddNewPage = React.createClass({
    propTypes: {
        listItem: React.PropTypes.object.isRequired,
        onNewListItemChange: React.PropTypes.func.isRequired,
        onSubmitNewItem: React.PropTypes.func.isRequired
    },

    render: function() {
        return (
            React.createElement("div", {},
                React.createElement(AddEntryForm, {listItem: this.props.listItem, onChange: this.props.onNewListItemChange, onSubmit: this.props.onSubmitNewItem})
            )
        )
    }
}); 



// Create statement for users to navigate pages
let state = {};

// On hash change
window.addEventListener('hashchange', ()=>setState({location: location.hash}));

let setState = function(changes) {
    let component;
    let componentProperties = {};

    Object.assign(state, changes);

    let splittedUrl = state.location.replace(/^#\/?|\/$/g, "").split("/"); 
// Lead users to add entry form
	
    switch(splittedUrl[0]) {
        case "newitem":
            component = AddNewPage; 
            componentProperties = {
                listItem: state.listItem,
                onNewListItemChange: function(item) {
                    setState({listItem: item});
                },
                onSubmitNewItem: function(item) {
                    let itemList = state.items; 
                    const newKey = itemList.length + 1; 
                    itemList.push(Object.assign({}, {key: newKey, id: newKey}, item)); 
                    setState({items: itemList, listItem: {name: "", dob: "", email: ""}});
                }
            };
            break;
			
        case "item":
            component = ItemPage;
            componentProperties = state.items.find(i => i.key == splittedUrl[1]); 
            
            break;
// A default set will lead user to the main list page
        default:
            component = ListPage;
            componentProperties = {items: state.items};
    }
    
// Create a line in the footer area
let FooterI = React.createClass({
    propTypes: {
        text: React.PropTypes.string,
        link: React.PropTypes.string
    },
    render: function() {
        return (
            React.createElement("p", {className: "footer"},
                this.props.text,
                React.createElement("a", {href: this.props.link}, this.props.link)
            )
        )
    }
});

// Combine all the lines in the footer area
let CombineAll = React.createClass({
    propTypes: {
        items: React.PropTypes.array
    },
    render: function() {
        return (
            React.createElement("div", {}, this.props.items.map(i => React.createElement(FooterI, i)))
        )
    }
}); 
    
// Create a element that I can put everything to render on the DOM
    let rootElement = React.createElement("div", {},
        React.createElement(Header, {}), //header
        React.createElement(NavMenu, {}),
        React.createElement(component, componentProperties),
        React.createElement(CombineAll, {items: footerText})
    );

    ReactDOM.render(rootElement, document.getElementById("react-app"));
};




setState({listItem: {name: "", 
					 dob: "",
					 email: ""}, 
		  location: location.hash, 
		  items: items});
