// import * as THREE from 'three';


// export default class ConnectFourBoard extends THREE.Group {
//     // Class content goes here
//     private grid: THREE.Group[][] = [];
//     private rows: number;
//     private columns: number;
//     //private board: number[][];

//     constructor(rows: number, columns: number) {
//         super();
//         this.rows = rows;
//         this.columns = columns;
//         this.grid = new Array(rows).fill(0).map(() => new Array(columns).fill(0));
//         //this.board = new Array(rows).fill(0).map(() => new Array(columns).fill(0));
//         this.initializeBoard();
//     }

    import * as THREE from 'three';

    export default class ConnectFourBoard extends THREE.Group {
       

        
            private grid: THREE.Group[][];
            private rows: number = 8;
            private columns: number = 8;
            private board: number[][];

            constructor(rows: number, columns: number) {
                super();
                this.rows = rows;
                this.columns = columns;
                this.grid = new Array(rows).fill(null).map(() => new Array(columns).fill(null));
                this.board = new Array(rows).fill(0).map(() => new Array(columns).fill(0));
                this.initializeBoard();
            }

            private initializeBoard(): void {
                for (let i = 0; i < this.rows; i++) {
                    for (let j = 0; j < this.columns; j++) {
                        this.grid[i][j] = new THREE.Group();
                    }
                }
            }

            public isCellEmpty(row: number, column: number): boolean {
                return this.board[row][column] === 0;
            }

            public addDiscToColumn(column: number, disc: number): boolean {
                for (let i = this.rows - 1; i >= 0; i--) {
                    if (this.isCellEmpty(i, column)) {
                        this.board[i][column] = disc;
                        return true;
                    }
                }
                return false;
            }
        }
        
            for (let i = 0; i < this.rows?; i++) {
                for (let j = 0; j < this.columns; j++) {
                    this.grid[i][j] = new THREE.Group();
                }
            }
        

    // public isCellEmpty(row: number, column: number): boolean {
    //     return this.board[row][column] === 0;
    // }

    // public addDiscToColumn(column: number, disc: number): boolean {
    //     for (let i = this.rows - 1; i >= 0; i--) {
    //         if (this.isCellEmpty(i, column)) {
    //             this.board[i][column] = disc;
    //             return true;
    //         }
    //     }
//         return false;
//     }
// }

