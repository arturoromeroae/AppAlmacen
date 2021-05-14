@extends('layouts.navbar')
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-BmbxuPwQa2lc/FVzBcNJ7UAyJxM6wuqIj61tLrc4wSX0szH/Ev+nYRRuWlolflfl" crossorigin="anonymous">

@section('content')
    <br/>
    <br/>
    <div class="card text-center mt-5">
        <div class="card-header">
            <?php echo $message; ?>
        </div>
        <?php echo $resultBill; ?>
        <div class="card-footer text-muted">
            Ahora
        </div>
    </div>
@endsection
