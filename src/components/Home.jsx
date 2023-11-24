// import { Component } from 'react';
// import Popular from './Popular';
// import Search from './Search';

// class Home extends Component {


//     state = { searchTerm: '' }

//     handleInput = (e) => {
        
//         this.setState({
//             searchTerm: e.target.value,
        
//         })
//     }


//     // Do not change the render function
//     render() {
//         return <div className="relative w-full">
//             <div className="search-input w-full">
//                 <input type="text" name="search"  className='w-[1100px] p-3 my-2 rounded-lg h-12' onChange={(e) => this.handleInput(e)} placeholder="Start typing to show results..." />
//             </div>
//             {this.state.searchTerm.length == 0  ? <Popular {...this.props} /> : <Search searchTerm={this.state.searchTerm} />}
//         </div>
//     }
// }

// export default Home;



import { Component } from 'react';
import Popular from './Popular';
import Search from './Search';

class Home extends Component {
    state = { searchTerm: '' };

    handleInput = (e) => {
        this.setState({
            searchTerm: e.target.value,
        });
    };

    handleSearch = () => {
        // Perform the search based on this.state.searchTerm
        // You may want to update the logic here based on your requirements
        // For example, you can call an API or perform some local search
        // Update the state or pass the search term to the Search component
        console.log('Performing search for:', this.state.searchTerm);
    };

    clearSearch = () => {
        this.setState({ searchTerm: '' });
    };

    // Do not change the render function
    render() {
        return (
            <div className="relative w-full">
                <div className="search-input w-full flex">
                    
                </div>
                {this.state.searchTerm.length === 0 ? (
                    <Popular {...this.props} />
                ) : (
                    <Search searchTerm={this.state.searchTerm} />
                )}
            </div>
        );
    }
}

export default Home;
