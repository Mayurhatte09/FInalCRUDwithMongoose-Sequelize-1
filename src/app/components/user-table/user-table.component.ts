import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { UserService } from '../../services/user.service';
import { UserDialogComponent } from '../user-dialog/user-dialog.component';
import { SharedImportsModule } from '../../shared.imports';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-table',
  templateUrl: './user-table.component.html',
  styleUrls: ['./user-table.component.scss'],
  standalone:true,
  imports:[SharedImportsModule,CommonModule]
})
export class UserTableComponent implements OnInit {
  displayedColumns: string[] = ['_id', 'name', 'email', 'actions'];
  dataSource = new MatTableDataSource<any>([]);
  totalItems = 0;
  pageSize = 5;
  pageIndex = 0;
  searchQuery: string = '';  // ✅ new

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private userService: UserService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  // ✅ Load users with pagination + search
  loadUsers(): void {
    const params = {
      page: this.pageIndex + 1,
      limit: this.pageSize,
      search: this.searchQuery || ''
    };

    this.userService.getUsers(params).subscribe((res: any) => {
      this.dataSource.data = res.data;
      this.totalItems = res.totalItems;
    });
  }

  onPageChange(event: PageEvent): void {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.loadUsers();
  }

  // ✅ New search function
  onSearchChange(value: string): void {
    this.searchQuery = value.trim();
    this.pageIndex = 0; // reset to first page on new search
    this.loadUsers();
  }

openAddDialog(): void {
  const dialogRef = this.dialog.open(UserDialogComponent, {
    width: '400px'
  });

  dialogRef.afterClosed().subscribe(result => {
    if (result) {
      this.userService.createUser(result).subscribe({
        next: () => {
          this.loadUsers();
        },
        error: (err) => {
          console.error('Create user failed', err);
        }
      });
    }
  });
}

openEditDialog(user: any): void {
  const dialogRef = this.dialog.open(UserDialogComponent, {
    width: '400px',
    data: user
  });

  dialogRef.afterClosed().subscribe(result => {
    if (result) {
      const id = user._id ?? result._id;

      this.userService.updateUser(id, result).subscribe({
        next: () => {
          this.loadUsers();
        },
        error: (err) => {
          console.error('Update user failed', err);
        }
      });
    }
  });
}


  deleteUser(id: string): void {
    if (confirm('Are you sure you want to delete this user?')) {
      this.userService.deleteUser(id).subscribe(() => {
        this.loadUsers();
      });
    }
  }

  logout(): void {
    // Your logout logic here
  }
}
