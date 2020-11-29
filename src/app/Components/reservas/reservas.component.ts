import { AfterViewChecked } from '@angular/core';
import { AfterViewInit } from '@angular/core';
import { ViewChild } from '@angular/core';
import { OnDestroy } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { Reserva } from 'src/app/Models/reserva.model';
import { ReservaService } from 'src/app/Services/evento.service';
import { UIService } from 'src/app/Shared/ui.service';

@Component({
  selector: 'app-reservas',
  templateUrl: './reservas.component.html',
  styleUrls: ['./reservas.component.css']
})
export class ReservasComponent implements OnInit, AfterViewInit, AfterViewChecked, OnDestroy {
  isLoading = false;
  reservas = new MatTableDataSource<Reserva>();
  eventosSubscription: Subscription;
  isLoadingSubscription: Subscription;

  private sort: MatSort;
  private paginator: MatPaginator;

  columnas: string[] = ['nombreYApellido', 'dni', 'idCabania', 'cantOcupantes', 'fechaDesde', 'fechaHasta', 'montoTotal', 'montoSenia', 'estado'];

  @ViewChild(MatSort) set matSort(ms: MatSort) {
    this.sort = ms;
    this.setDataSourceAttributes();
  }

  @ViewChild(MatPaginator) set matPaginator(mp: MatPaginator) {
    this.paginator = mp;
    this.setDataSourceAttributes();
  }

  setDataSourceAttributes() {
    this.reservas.sort = this.sort;
    this.reservas.paginator = this.paginator;
  }

  constructor(
    private reservaService: ReservaService,
    private uiService: UIService
  ) {}

  ngOnInit(): void {
    this.isLoadingSubscription = this.uiService.loadingStateChanged.subscribe(
      (isLoading) => (this.isLoading = isLoading)
    );
    this.eventosSubscription = this.reservaService.eventosChanged.subscribe(
      (eventos) => {
        this.reservas.data = eventos.map(e => e.extendedProps);
      }
    );
    this.reservaService.buscarEventos();
  }

  ngAfterViewInit(): void {
    this.reservas.sort = this.sort;
  }

  ngAfterViewChecked(): void {
    if (!this.isLoading && this.isLoadingSubscription) {
      this.isLoadingSubscription.unsubscribe();
    }
  }

  filtrar(valor: string): void{
    this.reservas.filter = valor.trim().toLowerCase();
  }

  ngOnDestroy(): void {
  }
}
