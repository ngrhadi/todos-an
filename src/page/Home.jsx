import { useState } from "react";
import I_tambah from "../icons/tambah.png";
import I_home from "../icons/home.png";
import I_trash from "../icons/trash.png";

const Home = () => {
	const [todo, setTodo] = useState(null);

	return (
		<div className="App">
			<header className="App-header">
				<h2 className="App-name">To Do List App</h2>
			</header>
			<div className="App-body">
				<div className="App-body-header">
					Activity
					<button className="App-body-header-button">
						<span>
							<img src={I_tambah} alt="tambah" width={14} height={14} />
						</span>
						<h4 className="App-body-button-text">Tambah</h4>
					</button>
				</div>
			</div>
			{todo ? (
				<div className="Icon-Home">
					<img src={I_home} alt="home" width={"767px"} />
				</div>
			) : (
				<>
					<div className="App-body-content">
						<div className="App-body-content-item">
							<div className="App-body-content-item-header">
								<div className="App-body-content-item-header-title">
									New Activity
								</div>
							</div>
							<div className="App-body-content-delete">
								<div className="App-body-content-item-header-date">
									10/10/2020
								</div>
								<button className="App-body-content-delete-button">
									<span>
										<img src={I_trash} alt="tambah" width={14} height={14} />
									</span>
								</button>
							</div>
						</div>
						<div className="App-body-content-item">
							<div className="App-body-content-item-header">
								<div className="App-body-content-item-header-title">
									New Activity
								</div>
							</div>
							<div className="App-body-content-delete">
								<div className="App-body-content-item-header-date">
									10/10/2020
								</div>
								<button className="App-body-content-delete-button">
									<span>
										<img src={I_trash} alt="tambah" width={14} height={14} />
									</span>
								</button>
							</div>
						</div>
						<div className="App-body-content-item">
							<div className="App-body-content-item-header">
								<div className="App-body-content-item-header-title">
									New Activity
								</div>
							</div>
							<div className="App-body-content-delete">
								<div className="App-body-content-item-header-date">
									10/10/2020
								</div>
								<button className="App-body-content-delete-button">
									<span>
										<img src={I_trash} alt="tambah" width={14} height={14} />
									</span>
								</button>
							</div>
						</div>
						<div className="App-body-content-item">
							<div className="App-body-content-item-header">
								<div className="App-body-content-item-header-title">
									New Activity
								</div>
							</div>
							<div className="App-body-content-delete">
								<div className="App-body-content-item-header-date">
									10/10/2020
								</div>
								<button className="App-body-content-delete-button">
									<span>
										<img src={I_trash} alt="tambah" width={14} height={14} />
									</span>
								</button>
							</div>
						</div>
						<div className="App-body-content-item">
							<div className="App-body-content-item-header">
								<div className="App-body-content-item-header-title">
									New Activity
								</div>
							</div>
							<div className="App-body-content-delete">
								<div className="App-body-content-item-header-date">
									10/10/2020
								</div>
								<button className="App-body-content-delete-button">
									<span>
										<img src={I_trash} alt="tambah" width={14} height={14} />
									</span>
								</button>
							</div>
						</div>
						<div className="App-body-content-item">
							<div className="App-body-content-item-header">
								<div className="App-body-content-item-header-title">
									New Activity
								</div>
							</div>
							<div className="App-body-content-delete">
								<div className="App-body-content-item-header-date">
									10/10/2020
								</div>
								<button className="App-body-content-delete-button">
									<span>
										<img src={I_trash} alt="tambah" width={14} height={14} />
									</span>
								</button>
							</div>
						</div>
						<div className="App-body-content-item">
							<div className="App-body-content-item-header">
								<div className="App-body-content-item-header-title">
									New Activity
								</div>
							</div>
							<div className="App-body-content-delete">
								<div className="App-body-content-item-header-date">
									10/10/2020
								</div>
								<button className="App-body-content-delete-button">
									<span>
										<img src={I_trash} alt="tambah" width={14} height={14} />
									</span>
								</button>
							</div>
						</div>
					</div>
				</>
			)}
		</div>
	);
};

export default Home;
